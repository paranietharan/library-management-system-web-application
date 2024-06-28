import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <p>©2024 InnovateCoders</p>
        </footer>
    );
};

const footerStyle = {
    backgroundColor: '#f4f4f4',
    color: '#333',
    textAlign: 'center',
    padding: '0.2rem',
    // position: 'fixed',
    left: '0',
    bottom: '0',
    width: 'calc(100%)',
    height: '50px',
    display: 'flex',
    justifyContent: 'center', // Horizontal centering
    alignItems: 'center', // Vertical centering
    border: '2px solid black',
    //margin: '20px 5px 2px 2px',
}

export default Footer;
