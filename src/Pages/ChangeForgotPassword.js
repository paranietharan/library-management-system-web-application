import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './style/ChangeForgotPassword.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../service/BaseUrl';

function ChangeForgotPassword() {

    const URL = `${baseURL}/user/resetPassword`;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const email = localStorage.getItem('email');
    const isVerified = localStorage.getItem('isVerified');
    const combinedObject = {emailAddress: email, password: password, isVerified: isVerified};
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!hasMinLength || !hasNumber || !hasSpecialChar || !passwordMatch) {
            console.error('Password does not meet requirements');   
            return;
        }
        try {
            console.log(combinedObject);
            const response = await axios.post( URL, combinedObject);
            console.log(response.data);
            if (response.data) {
                localStorage.removeItem('email');
                localStorage.removeItem('isVerified');
                // Redirect to confirmation page with response data
                navigate('/verification-success');
            } else {
                console.error('Password change failed:');
            }
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };





    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // Password validation logic
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    // eslint-disable-next-line no-useless-escape
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]+/.test(password);
    const passwordMatch = password === confirmPassword;

    return (
        <div className={styles['login-container']}>
            <div className={styles['container']}>
                <div className={styles['login-form']}>
                    <form className={styles['form']}>
                        <div className={styles['input-container']}>
                            <div className={styles['input-wrapper']}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder='&#xf023; Password'
                                    className={styles['login-input']}
                                    style={{ fontFamily: 'Arial, FontAwesome' }}
                                />

                                <button type="button" onClick={togglePasswordVisibility} className={styles['eye-icon-button']}>
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                </button>
                            </div>

                            <div className={styles['input-wrapper']}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder='&#xf023; Confirm Password'
                                    className={styles['login-input']}
                                    style={{ fontFamily: 'Arial, FontAwesome' }}
                                />
                            </div>
                        </div>
                        <div className={styles['password-requirements']}>
                            <ul>
                                <li>At least 8 characters: <span className={hasMinLength ? styles['password-requirements-right-symbol'] : styles['password-requirements-wrong-symbol']}>{hasMinLength ? '✓' : '✗'}</span></li>
                                <li>At least 1 number: <span className={hasNumber ? styles['password-requirements-right-symbol'] : styles['password-requirements-wrong-symbol']}>{hasNumber ? '✓' : '✗'}</span></li>
                                <li>At least 1 special character: <span className={hasSpecialChar ? styles['password-requirements-right-symbol'] : styles['password-requirements-wrong-symbol']}>{hasSpecialChar ? '✓' : '✗'}</span></li>
                                <li>Passwords match: <span className={passwordMatch ? styles['password-requirements-right-symbol'] : styles['password-requirements-wrong-symbol']}>{passwordMatch ? '✓' : '✗'}</span></li>
                            </ul>
                        </div>
                        <button 
                            type='submit' 
                            className={styles['login-form-submit-button']}
                            onClick={handleSubmit}>
                                Change Password 
                                {<i className="fa fa-chevron-circle-right" 
                                    aria-hidden="true" 
                                    style={{ marginLeft: '10px', 
                                    fontSize: '20px' }}></i>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangeForgotPassword;