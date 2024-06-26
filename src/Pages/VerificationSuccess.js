import VerificationSuccessMessage from '../Components/VerificationSuccessMessage';
import styles from './style/VerificationSuccess.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function VerificationSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000); // Redirect after 5000ms (5 seconds)

    // Cleanup function to clear the timer if the component unmounts before the timer finishes
    return () => clearTimeout(timer);
  }, [navigate]); // Dependency array

  return (
    <div className={styles.VerificationSuccess}>
      <div className={styles['Verification-Success-container']}>
        <VerificationSuccessMessage />
      </div>
    </div>
  );
}

export default VerificationSuccess;