import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

// 2 icons from Material-UI
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PolicyIcon from '@mui/icons-material/Policy';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import LogoutIcon from '@mui/icons-material/Logout';
import ReportIcon from '@mui/icons-material/Report';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import styles from './style/UserProfileLeftSideNavBar.module.css';
import LogOutUser from '../service/LogoutUser';

function UserProfileLeftSideNavBar() {
  return (
    <div className={styles.leftSideNavBar}>

      <div className={styles.navItem}>
        <Link to="/" className={styles.navLink}>
          <ArrowBackIosNewIcon />
          {/* <span className={styles.navText}>Back</span> */}
        </Link>
      </div>
      
      <div className={styles.navItem}>
        <Link to="/edit-profile" className={styles.navLink}>
          <PermIdentityIcon />
          <span className={styles.navText}>Edit Profile</span>
        </Link>
      </div>

      <div className={styles.navItem}>
        <Link to="/security" className={styles.navLink}>
          <PrivacyTipIcon />
          <span className={styles.navText}>Security</span>
        </Link>
      </div>

      <div className={styles.navItem}>
        <Link to="/terms" className={styles.navLink}>
          <PolicyIcon />
          <span className={styles.navText}>Terms and Policies</span>
        </Link>
      </div>

      <div className={styles.navItem}>
        <Link to="/lending-history" className={styles.navLink}>
          <ManageHistoryIcon />
          <span className={styles.navText}>lending History</span>
        </Link>
      </div>

      <div className={styles.navItem}>
        <Link to="/fine-history" className={styles.navLink}>
          <CurrencyExchangeIcon />
          <span className={styles.navText}>Fine History</span>
        </Link>
      </div>

      <div className={styles.navItem}>
        <Link to="/logout" className={styles.navLink}>
          <LogoutIcon />
          <span className={styles.navText}>Logout</span>
        </Link>
      </div>

    </div>
  );
}

export default UserProfileLeftSideNavBar;