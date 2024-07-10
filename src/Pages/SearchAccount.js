import styles from './style/SearchAcccountStyle.module.css';
import imgSrc from '../resources/login-background-img.jpg';
import { Link ,useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import { baseURL } from '../service/BaseUrl';
import AlertMessage from '../Components/AlertMessage';

function SearchAccount() {
    const URL = `${baseURL}/user/forgotPassword`;

    // for alert message
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setShowAlert(false);
    };
        

    const navigate = useNavigate();

    //for connecting to the backend
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        if(email == null ){
            console.error('Form validation failed');
            return;
    
        }
        try {
            console.log(email);
            const response = await axios.post( URL, {emailAddress :email});
            console.log(response.data);
            if (response.data) {
                localStorage.setItem('email', email)
                // Redirect to confirmation page with response data
                navigate('/verifyMailForgotPassword');
            } else {
                console.error('Search failed:');
                setShowAlert(true);
                setMessage("User not found");
            }
        } catch (error) {
            console.error('Error searching user:', error);
        }
    }
    

    return (
        <div className={styles['login-container']}>
            <div className={styles['join-now']}>
                <p>Not a member yet? <Link to='/details-fill'>Join Now</Link></p>
            </div>

            <div className={styles['container']}>
                <div className={styles['login-form']}>
                    <form className={styles['form']} onSubmit={handleSubmit}>
                        <div className={styles['input-container']}>
                            <div className={styles['input-wrapper']}>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="&#xf0e0; Example@Email.com"
                                    className={styles['login-input']}
                                    style={{ fontFamily: 'Arial, FontAwesome' }}
                                    required
                                />
                            </div>
                        </div>
                        <button 
                            type='submit' 
                            className={styles['login-form-submit-button']}>
                            Search My Account 
                            {<i className="fa fa-chevron-circle-right" 
                            aria-hidden="true" 
                            style={{ marginLeft: '10px', fontSize: '20px' }}></i>}
                        </button>
                    </form>
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

export default SearchAccount;