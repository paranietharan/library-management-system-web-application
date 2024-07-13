import CheckYourEmail from '../Components/CheckYourEmail';
import styles from './style/VerifyForgotPassword.module.css';
import { Link , useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../service/BaseUrl';
import AlertMessage from '../Components/AlertMessage';

function VerifyForgotPassword() {

    const URL = `${baseURL}/user/verifyOTP`;

    // for alert message
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setShowAlert(false);
    };
    
    const [otpValue, setOtpValue] = useState();   

    const setVerificationCode = (e) => {
        setOtpValue(e.target.value);
        console.log(e.target.value);
    }

    const email = localStorage.getItem('email');
    const combinedObject = {emailAddress: email, otpValue: otpValue}
    const navigate = useNavigate();

    const SubmitCode = async (event) => {
        event.preventDefault();
        try {
            console.log(combinedObject)
            const response = await axios.post( URL, combinedObject);
            console.log(response.data);
            if (response.data) {
                localStorage.setItem('isVerified', true);
                // Redirect to confirmation page with response data
                navigate('/change-forgot-password');
            } else {
                console.error('Verification failed:');
                setShowAlert(true);
                setMessage("OTP verification failed");
            }
        } catch (error) {
            console.error('Error verifying email:', error);
        }
    }

    return (
        <div>
            <div className={styles['background-image-container']}></div>

            <div className={styles['container']}>
                <div className={styles['sign-in']}>
                    <p>Already a member?<Link to='/login'>Log in</Link></p>
                </div>


                <div className={styles['verify-email-contents']}>
                    <div className={styles['verify-email-container']}>
                        <CheckYourEmail />
                    </div>
                    <div className={styles['form-container']}>
                        <form className={styles['verify-email-form']}>
                            <div className={styles['form-group']}>
                                <input type='text' id='code' name='code' placeholder='Verification Code' onChange={setVerificationCode} />
                            </div>
                            <div className={styles['form-group']}>
                                <button type='button' onClick={SubmitCode}>Verify</button>
                            </div>
                        </form>
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

export default VerifyForgotPassword;