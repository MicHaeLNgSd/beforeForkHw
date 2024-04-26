import React from 'react';
import Header from '../../components/Header';
import RegistrationForm from '../../components/RegistrationForm';
import styles from './RegistrationPage.module.scss';

const RegistrationPage = (props) => {
  return (
    <>
      <Header />
      <section className={styles.container}>
        <h1 className={styles.heading}>Register now</h1>
        <RegistrationForm />
      </section>
    </>
  );
};

export default RegistrationPage;
