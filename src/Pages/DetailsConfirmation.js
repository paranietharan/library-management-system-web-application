import styles from './style/DetailsConfirmation.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../service/BaseUrl';

function DetailsConfirmation() {

    const URL = `${baseURL}/user/sendOtp`;

    const location = useLocation();
    const { data } = location.state;

    const navigate = useNavigate();

    const emailAddress = JSON.parse(localStorage.getItem('user')).emailAddress;
    

    const handleButtonClick = async (event) => {
        event.preventDefault();
        console.log('Email:', emailAddress);
        try {
            const response = await axios.post( URL,{emailAddress: emailAddress});
            console.log(response.data);
            if (response.data) {
                // Redirect to confirmation page with response data
                navigate('/verify-email');
            } else {
                console.error('Registration failed:');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }



    return (
        <div>
            <div className={styles['background-image-container']}></div>

            <div className={styles.container}>
                <div className={styles['sign-in']}>
                    <p>Already a member?<Link to='/login'>Log in</Link></p>
                </div>

                <div className={styles['confirmation-form-container']}>
                    <div className={styles['confirmation-details']}>
                        <p className={styles['first-name']}>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                defaultValue={data.firstName}
                                disabled // Make the input disabled to prevent editing
                            />
                        </p>
                        <p className={styles['last-name']}>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                defaultValue={data.lastName}
                                disabled // Make the input disabled to prevent editing
                            />
                        </p>
                        <p className={styles['dob']}>
                            Date of Birth:
                            <input
                                type="text"
                                name="dob"
                                defaultValue={data.dateOfBirth}
                                disabled // Make the input disabled to prevent editing
                            />
                        </p>
                        <p className={styles['class-details']}>
                            Class Details:
                            <input
                                type="text"
                                name="classDetails"
                                defaultValue={data.grade}
                                disabled // Make the input disabled to prevent editing
                            />
                        </p>

                        <button 
                            type='submit' 
                            className={styles['confirm-details-next-button']}
                            onClick={handleButtonClick}
                            >Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsConfirmation;