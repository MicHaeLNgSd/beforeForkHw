import React from 'react';
import Header from '../../components/Header';
import styles from './LoginPage.module.scss';
import LoginForm from '../../components/LoginForm';

const LoginPage = (props) => {
  return (
    <>
    <Header />
    <section className={styles.container}>
      <h1 className={styles.heading}>Login now</h1>
      <LoginForm />
    </section>
  </>
  );
}

export default LoginPage;
