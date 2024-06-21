// ChangePassword.js

import React, { useState } from 'react';
import styles from './style/ChangePassword.module.css';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

function ChangePassword() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleToggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const handleToggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className={styles.changePasswordContainer}>
            <h1>Change Your Password</h1>
            <form className={styles.changePasswordForm}>
                <div className={styles.changePasswordFormItem}>
                    <label htmlFor="current-password">Current Password</label>
                    <TextField
                        type={showCurrentPassword ? 'text' : 'password'}
                        id="current-password"
                        name="current-password"
                        variant="outlined"
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