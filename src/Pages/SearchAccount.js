import styles from './style/SearchAcccountStyle.module.css';
import imgSrc from '../resources/login-background-img.jpg';
import { Link ,useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

function SearchAccount() {
    const [isWrong, setIsWrong] = useState(false);
    const [showInvalidEmail, setShowInvalidEmail] = useState(false);
    const navigate = useNavigate();

    //for connecting to the backend
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        if(email == null ){
            setIsWrong(false);
            setShowInvalidEmail(true);
        }
        try {
            const response = await axios.post('http://localhost:8080/user/forgotPassword', { email });
            console.log(response.data);
            if (response.data.true) {
                localStorage.setItem('email', email)
                // Redirect to confirmation page with response data
                navigate.push('/verify-email');
            } else {
                console.error('Search failed:', response.data.message);
                setIsWrong(false);
                setShowInvalidEmail(true);
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
                <div className={`${styles['login-form']} ${isWrong && styles['wrong-login']}`}>
                    {showInvalidEmail && <p className={styles['invalid-email']}>Invalid email. Try again</p>}
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
        </div>
    )
}

export default SearchAccount;