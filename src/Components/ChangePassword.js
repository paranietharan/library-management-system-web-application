import React, { useEffect, useState } from 'react';
import styles from './style/ChangePassword.module.css';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import httpCommon from '../service/http-common';
import getUserID from '../service/GetUserID';

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userID, setUserID] = useState('');

    useEffect(() => {
        const userID = getUserID();
        setUserID(userID);
    }, []);

    const handleToggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const handleToggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match!");
            return;
        }

        const changePasswordRequest = {
            oldPassword: currentPassword,
            newPassword: newPassword
        };

        try {
            const response = await httpCommon.post(`http://localhost:8080/user/changePassword/${userID}`, changePasswordRequest);
            console.log(response);
            if (response.data == true) {
                alert("Password changed successfully!");
                // forward to home page
                window.location.href = "/";
            }

            if(response.data == false){
                alert("Password change failed! Please check your current password.");
            }
        } catch (error) {
            console.error("There was an error changing the password!", error);
            alert("Error changing password, please try again later.");
        }
    };

    return (
        <div className={styles.changePasswordContainer}>
            <h1>Change Your Password</h1>
            <form className={styles.changePasswordForm} onSubmit={handleSubmit}>
                <div className={styles.changePasswordFormItem}>
                    <label htmlFor="current-password">Current Password</label>
                    <TextField
                        type={showCurrentPassword ? 'text' : 'password'}
                        id="current-password"
                        name="current-password"
                        variant="outlined"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleToggleCurrentPasswordVisibility}
                                        edge="end"
                                        className={styles.visibilityToggleBtn}
                                    >
                                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                
                <div className={styles.changePasswordFormItem}>
                    <label htmlFor="new-password">New Password</label>
                    <TextField
                        type={showNewPassword ? 'text' : 'password'}
                        id="new-password"
                        name="new-password"
                        variant="outlined"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleToggleNewPasswordVisibility}
                                        edge="end"
                                        className={styles.visibilityToggleBtn}
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                <div className={styles.changePasswordFormItem}>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <TextField
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirm-password"
                        name="confirm-password"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleToggleConfirmPasswordVisibility}
                                        edge="end"
                                        className={styles.visibilityToggleBtn}
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    className={styles.changePasswordSubmitBtn}
                >
                    Change Password
                </Button>
            </form>
        </div>
    );
}

export default ChangePassword;