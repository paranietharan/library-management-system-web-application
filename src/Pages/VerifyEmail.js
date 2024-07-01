import CheckYourEmail from '../Components/CheckYourEmail';
import styles from './style/VerifyEmail.module.css';
import { Link } from 'react-router-dom';
import OtpInput from '../Components/OtpInput';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function VerifyEmail() {
   
    // 1 state for otp value
    const [otpValue, setOtpValue] = useState(new Array(6).fill(''));
    
    // 2 handle otp change
    const handleOtpChange = (otp) => {
        console.log('OTP changed:', otp);
        setOtpValue(otp);
    };

    const userSaveRequset = JSON.parse(localStorage.getItem('user'));
    const combinedObject = {
        ...userSaveRequset,
        otpValue: otpValue
    };
    const navigate = useNavigate();


    // 3 submit code

    const SubmitCode = async (event) => {
        event.preventDefault();
        try {
            console.log('User:', combinedObject);
            const response = await axios.post('http://localhost:8080/user/saveUser', combinedObject);
            console.log(response.data);
            if (response.data) {
                // Redirect to confirmation page with response data
                navigate('/verification-success');
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

                    <form className={styles['verify-email-form']}>
                        <div className={styles['form-group']}>
                            <OtpInput length={6} onOtpChange={handleOtpChange} />
                        </div>

                        <div className={styles['form-group']}>
                            <button type='button' onClick={SubmitCode}>Verify</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default VerifyEmail;