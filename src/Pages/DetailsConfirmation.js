import styles from './style/DetailsConfirmation.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function DetailsConfirmation() {
    const [currentStep, setCurrentStep] = useState(2);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const formValues = {
        firstName: 'Shobikan',
        lastName: 'Vigneshwaran',
        dob: '29/08/2001',
        classDetails: '12C'
    };

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
                                defaultValue={formValues.firstName}
                                disabled // Make the input disabled to prevent editing
                            />
                        </p>
                        <p className={styles['last-name']}>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                defaultValue={formValues.lastName}
                                disabled // Make the input disabled to prevent editing
                            />
                        </p>
                        <p className={styles['dob']}>
                            Date of Birth:
                            <input
                                type="text"
                                name="dob"
                                defaultValue={formValues.dob}
                                disabled // Make the input disabled to prevent editing
                            />
                        </p>
                        <p className={styles['class-details']}>
                            Class Details:
                            <input
                                type="text"
                                name="classDetails"
                                defaultValue={formValues.classDetails}
                                disabled // Make the input disabled to prevent editing
                            />
                        </p>

                        <button type='submit' className={styles['confirm-details-next-button']}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsConfirmation;