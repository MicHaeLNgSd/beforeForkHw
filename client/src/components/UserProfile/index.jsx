import React from 'react';
import styles from './UserProfile.module.scss'
import CONSTANTS from '../../constants';

const UserProfile = ({ user }) => {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <article className={styles.container}>
      <h1 className={styles.heading}>User Profile</h1>
      <h2 className={styles.subheading}>{fullName}</h2>
      <div className={styles.imgWrapper}>
        <img
        className={styles.img}
          src={
            user.imgSrc
              ? user.imgSrc
              : CONSTANTS.PLACEHOLDER_USER_PIC
          }
          alt={fullName}
        />
      </div>
      <section className={styles.details}>
        <h3 className={styles.detailsHeading}>User details</h3>
        <ul className={styles.detailsList}>
          <li className={styles.listItem}>
            <p className={styles.detailText}>
              <span className={styles.detailTextBold}>Email</span>: {user.email}
            </p>
          </li>
          <li className={styles.listItem}>
            <p className={styles.detailText}>
              <span className={styles.detailTextBold}>Gender</span>: {user.isMale ? 'male' : 'female'}
            </p>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default UserProfile;
