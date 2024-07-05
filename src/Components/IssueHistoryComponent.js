import React from 'react';
import styles from './style/IssueHistoryComponent.module.css';

function IssueHistoryComponent({ issue }) {
    const returnedStyle = {
        color: issue.returned ? 'green' : 'red',
        fontWeight: 'bold'
    };

    const borderstyle ={
        border: issue.returned ? '2px solid green' : '2px solid red',
        padding: '10px',
        margin: '10px'
    }

    return (
        <div className={styles.issueHistoryItem} style={borderstyle}>
            <p>Issue ID: {issue.issueId}</p>
            <p>Date: {new Date(issue.date).toLocaleDateString()}</p>
            <p style={returnedStyle}>Returned: {issue.returned ? 'Yes' : 'No'}</p>
            <p>Resource ID: {issue.resourceId}</p>
        </div>
    );
}

export default IssueHistoryComponent;
