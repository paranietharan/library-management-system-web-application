import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const NotificationItem = ({ notification, onDelete }) => {
    return (
        <ListItem>
            <ListItemText primary={<h3>{notification.title}</h3>} secondary={notification.message} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(notification.id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default NotificationItem;