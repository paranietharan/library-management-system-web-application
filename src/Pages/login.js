import styles from './style/loginStyle.module.css'; // Import CSS module file
import imgSrc from '../resources/library-login-bg.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                                    placeholder="&#xf0e0; Example@Email.com"
                                    className={styles['login-input']}
                                    style={{ fontFamily: 'Arial, FontAwesome' }}
                                />
                            </div>

                            {/*Password Input Container */}
                            <div className={styles['input-wrapper']}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                        <button type='submit' className={styles['login-form-submit-button']}>Proceed to my Account</button>
                    </form>

                    {/* Forgot Password */}
                    <div className={styles['forgot-password']}>
                        <Link to='/forgot-password'>Having issues with your password</Link>
                    </div>
                </div>
            </div>

            <div className={styles['img-container']}>
                <img src={imgSrc} alt='background' className={styles['background-img']} />
            </div>
        </div>
    )
}

export default Login;