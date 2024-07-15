import styles from './style/loginStyle.module.css'; // Import CSS module file
import imgSrc from '../resources/library-login-bg.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { baseURL } from '../service/BaseUrl';
import AlertMessage from '../Components/AlertMessage';
import { useAuth } from '../service/AuthContext';

function Login() {

    const { login } = useAuth();

    const URL = `${baseURL}/user/login`;

    // for alert message
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setShowAlert(false);
    };    
   
    const [showPassword, setShowPassword] = useState(false);

    const [request, setRequest] = useState({
        emailAddress: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRequest(prevRequest => ({
            ...prevRequest,
            [name]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {        
        event.preventDefault();
        console.log('Request:', request);
        const cleanRequest = {
            emailAddress: request.emailAddress,
            password: request.password,
        };

        try {
            console.log('cleanRequest:', cleanRequest);
            const response = await axios.post( URL, cleanRequest);
            console.log(response.data);
            if (response.data.loginSuccess) {
                // Save the token to local storage
                localStorage.setItem('token', response.data.token);
                // Decode the token
                const decodedToken = jwtDecode(response.data.token);
                // Get the role from the decoded token
                const role = decodedToken.role;
                console.log('Role:', role);

                const userDetails = {
                    isAuthenticated: true,
                    role: role
                };
                console.log('User Details:', userDetails);
                // Save the user details to local storage
                localStorage.setItem('user', JSON.stringify(userDetails));
                login(userDetails);    
                
                // Redirect based on user role
                if (role === 'MEMBER') {
                    navigate('/');
                } else if (role === 'LIBRARIAN') {
                    navigate('/admin');
                } else {
                    console.log('Unknown user role:', role);
                   
                }
            } else {
                console.log('Login failed:', response.data.message);
                setShowAlert(true);
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };


    return (
        <div className={styles['login-container']}>
            {/* Join Now text */}
            <div className={styles['join-now']}>
                <p>Not a member yet? <Link to='/details-fill'>Join Now</Link></p>
            </div>

            
            <div className={styles['container']}>
                <div className={styles['login-form']}>
                    {/* Login Form */}
                    <form className={styles['form']}>
                        {/* Input Container */}
                        <div className={styles['input-container']}>
                            {/*Email Input Container */}
                            <div className={styles['input-wrapper']}>
                                <input
                                    type="text"
                                    name="emailAddress"
                                    placeholder="&#xf0e0; Example@Email.com"
                                    className={styles['login-input']}
                                    style={{ fontFamily: 'Arial, FontAwesome' }}
                                    value={request.emailAddress}
                                    onChange={handleChange}
                                />
                            </div>

                            {/*Password Input Container */}
                            <div className={styles['input-wrapper']}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={request.password}
                                    onChange={handleChange}
                                    placeholder='&#xf023; Password'
                                    className={styles['login-input']}
                                    style={{ fontFamily: 'Arial, FontAwesome' }}
                                />

                                {/* Toggle function */}
                                <button type="button" onClick={togglePasswordVisibility} className={styles['eye-icon-button']}>
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                </button>
                            </div>
                        </div>

                        {/* Submit button */}
                        <button 
                            type='submit' 
                            className={styles['login-form-submit-button']}
                            onClick={handleSubmit}
                        >   Proceed to my Account
                        </button>
                    </form>

                    {/* Forgot Password */}
                    <div className={styles['forgot-password']}>
                        <Link to='/search-account'>Having issues with your password</Link>
                    </div>
                </div>
            </div>

            <div className={styles['img-container']}>
                <img src={imgSrc} alt='background' className={styles['background-img']} />
            </div>
            <AlertMessage 
                show={showAlert}
                message={message}
                onClose={handleClose}
            />
        </div>
    )
}


export default Login;