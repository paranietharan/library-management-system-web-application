import React from 'react';
import imgSrc from '../resources/unauthorized-image.png';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f0f2f5',
            color: '#333',
        }}>
            <img 
                src={imgSrc}
                alt="Unauthorized Access"
                style={{
                    width: '150px',
                    marginBottom: '20px',
                }}
            />
            <h1 style={{
                fontSize: '3rem',
                marginBottom: '10px',
                color: '#e74c3c',
            }}>
                Unauthorized
            </h1>
            <p style={{
                fontSize: '1.2rem',
                textAlign: 'center',
                maxWidth: '400px',
                lineHeight: '1.6',
            }}>
                You are not authorized to access this page. Please login to continue.
            </p>
            <Link
            to="/logout"
            style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '1rem',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                textDecoration: 'none',
            }}
            >
                Login
            </Link>
        </div>
    );
};

export default UnauthorizedPage;