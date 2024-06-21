import React from 'react';
import DisplayMemberVerificationDetails from './DisplayMemberVerificationDetails';
import styles from './style/AddMemberComponent.module.css';
import { useState } from 'react';

function AddMemberComponent() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!firstName || !lastName || !email || !phoneNumber) {
            setError('All fields are required.');
            return;
        }

        // If all validations pass, navigate to the next component
        setIsSubmitted(true);
        setError('');
    };

    const handleConfirm = () => {
        // function 2 handle confirmation
        console.log('Confirmation: Account created successfully');
    };

    const handleGoToMainMenu = () => {
        console.log('Go to main menu');
    };

    return (
        <div className={styles.addMemberComponent}>
            {isSubmitted ? (
                <DisplayMemberVerificationDetails 
                    memberDetails={{
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phoneNumber: phoneNumber
                    }}
                    onConfirm={handleConfirm}
                    onGoToMainMenu={handleGoToMainMenu}
                />
            ) : (
                <>
                    <h2>Add Member</h2>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <form onSubmit={handleSubmit} className={styles.detailsInputForm}>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default AddMemberComponent;