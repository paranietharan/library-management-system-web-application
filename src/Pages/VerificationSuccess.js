import VerificationSuccessMessage from '../Components/VerificationSuccessMessage';
import styles from './style/VerificationSuccess.module.css';

function VerificationSuccess() {
  return (
    <div className={styles.VerificationSuccess}>
      <div className={styles['Verification-Success-container']}>
        <VerificationSuccessMessage />
      </div>
    </div>
  );
}

export default VerificationSuccess;