import { Link, useNavigate } from 'react-router-dom';
import styles from './style/DetailsFillingStyle.module.css';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../service/BaseUrl';
import 'font-awesome/css/font-awesome.min.css';
import AlertMessage from '../Components/AlertMessage';


function DetailsFilling() {

    const URL = `${baseURL}/user/checkDetails`;

    // for alert message
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setShowAlert(false);
    };

    // for connecting to the backend
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        indexNumber: '',
        emailAddress: '',
        phoneNumber: '',
        password: ''
    });

    

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!emailValid || !phoneNumberValid || !isValid || !passwordMatch) {
            console.log(
                'Email:', emailValid,
                'Phone Number:', phoneNumberValid,
                'Password:', isValid,
                'Password Match:', passwordMatch
            );
            console.error('Form validation failed');
            return;
        }
        try {
            console.log('User:', user);
            const response = await axios.post( URL, user);            
            console.log(response.data);
            if (response.data.message === 'User found') {
                localStorage.setItem('user', JSON.stringify(user));
            // Redirect to confirmation page with response data
            navigate('/details-confirmation', { state: { data: response.data} });
            } else if (response.data.message === 'User already exists') {
                console.error('Registration failed:', response.data.message);
                setShowAlert(true);
                setMessage(response.data.message);
            } else {
                console.error('Registration failed:');
                setShowAlert(true);
                setMessage("User data does not match our records. Please check your details.");
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    // for email checking
    const [emailValid, setEmailValid] = useState(false);

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        handleChange(event);
        setEmailValid(checkEmail(newEmail));
    };

    const checkEmail = (emailAddress) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
    };

    // for phone number checking
    const [phoneNumberValid, setPhoneNumberValid] = useState(false);

    const handlePhoneNumberChange = (event) => {
        const newPhoneNumber = event.target.value;
        handleChange(event);
        setPhoneNumberValid(checkPhoneNumber(newPhoneNumber));
    };

    const checkPhoneNumber = (phoneNumber) => {
        return /^[0-9]{10}$/.test(phoneNumber);
    };

    // for password checking
    const [isValid, setIsValid] = useState(false);
    const [hasMinLength, setHasMinLength] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);

    const [passwordMatch, setPasswordMatch] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        handleChange(event);

        setHasMinLength(checkMinLength(newPassword));
        setHasNumber(checkNumber(newPassword));
        setHasSpecialChar(checkSpecialChar(newPassword));

        setIsValid(checkPassword(newPassword));
    };

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
        setPasswordMatch(newConfirmPassword === user.password);
    };

    const checkMinLength = (password) => {
        return password.length >= 8;
    };

    const checkNumber = (password) => {
        return /\d/.test(password);
    };

    const checkSpecialChar = (password) => {
        return /[!@#$%^&*(),.?":{}|<>]/.test(password);
    };

    const checkPassword = (password) => {
        return checkMinLength(password) && checkNumber(password) && checkSpecialChar(password);
    };

    return (
        <div>
            <div className={styles['background-image-container']}></div>

            <div className={styles.container}>
                <div className={styles['sign-in']}>
                    <p>Already a member?<Link to='/login'>Log in</Link></p>
                </div>

                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='First Name'
                            name='firstName'
                            value={user.firstName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type='text'
                            placeholder='Last Name'
                            name='lastName'
                            value={user.lastName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type='text'
                            placeholder='Index Number'
                            name='indexNumber'
                            value={user.indexNumber}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            placeholder="&#xf0e0; Example@Email.com"
                            style={{ fontFamily: 'fontAwesome', width: '100%' }}
                            name='emailAddress'
                            value={user.emailAddress}
                            onChange={handleEmailChange}
                            required
                        />

                        <input
                            type='text'
                            placeholder='&#xf095; Phone Number'
                            style={{ fontFamily: 'fontAwesome', width: '100%' }}
                            name='phoneNumber'
                            value={user.phoneNumber}
                            onChange={handlePhoneNumberChange}
                            required
                        />

                        <input
                            type='password'
                            placeholder='&#xf023; Password'
                            style={{ fontFamily: 'fontAwesome', width: '100%' }}
                            name='password'
                            value={user.password}
                            onChange={handlePasswordChange}
                            required
                        />

                        <input
                            type='password'
                            placeholder='&#xf023; Confirm Password'
                            style={{ fontFamily: 'fontAwesome', width: '100%' }}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />

                        <div className={styles['password-requirements']}>
                            <ul>
                                <li>At least 8 characters: {hasMinLength ? '✓' : '✗'}</li>
                                <li>At least 1 number: {hasNumber ? '✓' : '✗'}</li>
                                <li>At least 1 special character: {hasSpecialChar ? '✓' : '✗'}</li>
                                <li>Passwords match: {passwordMatch ? '✓' : '✗'}</li>
                            </ul>
                        </div>

                        <button type='submit' className={styles['next-button']}>Next</button>
                    </form>

                    <div className={styles.terms}>
                        <p>By creating an account you agree to our <Link to='/terms'>Terms & Privacy</Link></p>
                    </div>
                </div>
            </div>
            <AlertMessage
                show={showAlert}
                message={message}
                onClose={handleClose}
            />
        </div>
    );
}

export default DetailsFilling;
