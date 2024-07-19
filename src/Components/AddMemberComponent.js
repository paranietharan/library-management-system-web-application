import React, { useState } from 'react';
import styles from './style/AddMemberComponent.module.css';
import httpCommon from '../service/http-common';

function AddMemberComponent() {
    const [indexNo, setIndexNo] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !phoneNumber || !indexNo) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await httpCommon.post('user/librarian/addUser', null, {
                params: {
                    email: email,
                    phoneNumber: phoneNumber,
                    indexNumber: indexNo
                }
            });

            if (response.status === 200) {
                // get the response data
                const data = response.data;
                if(data === 'User already exists') {
                    alert('User already exists');
                    setError('User already exists');
                    return;
                } else if(data === 'User added successfully') {//User added successfully
                    alert('User added successfully');
                } else if(data === 'User not found in Student Database') {
                    alert('User not found in Student Database');
                    setError('User not found in Student Database');
                    return;
                }
                alert(response.data);
                setError('');
                handleConfirm();
            } else {
                setError('Failed to add member.');
            }
        } catch (error) {
            setError('Failed to add member.');
            console.error('There was an error!', error);
        }
    };

    const handleConfirm = () => {
        console.log('Confirmation: Account created successfully');
    };

    const handleGoToMainMenu = () => {
        console.log('Go to main menu');
        // forward to admin Membership Management page
        window.location.href = '/membershipManagement';
    };

    return (
        <div className={styles.addMemberComponent}>
            <h2>Add Member</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}
            {isSubmitted ? (
                <div>
                    <p>Member added successfully!</p>
                    <button onClick={handleGoToMainMenu}>Go to Main Menu</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={styles.detailsInputForm}>
                    <input
                        type="text"
                        placeholder="Index Number"
                        value={indexNo}
                        onChange={(e) => setIndexNo(e.target.value)}
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
            )}
        </div>
    );
}

export default AddMemberComponent;