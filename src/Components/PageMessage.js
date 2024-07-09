import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/PageMessageStyle.module.css';

function PageMessage({ heading, message }) {
  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        <div className={styles.heading}>
          <h1 style={{ marginLeft: '5px' }}>{heading}</h1>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
}

// Define prop types for the component
PageMessage.propTypes = {
  message: PropTypes.string.isRequired, // Ensure message is a required string
};

export default PageMessage;