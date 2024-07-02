import CheckYourEmail from '../Components/CheckYourEmail';
import styles from './style/VerifyForgotPassword.module.css';
import { Link , useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function VerifyForgotPassword() {
    
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
            const response = await axios.post('http://localhost:8080/user/verifyOTP', combinedObject);
            console.log(response.data);
            if (response.data) {
                // Redirect to confirmation page with response data
                navigate('/change-forgot-password');
            } else {
                console.error('Verification failed:');
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
        </div>
    );
}

export default VerifyForgotPassword;