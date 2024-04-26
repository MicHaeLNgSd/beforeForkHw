import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import cx from 'classnames';
import { registration } from '../../api';
import { USER_REGISTRATION_SCHEMA } from '../../validation/userValidation';
import styles from './RegistrationForm.module.scss';
import UserContext from '../../contexts/userContext';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordRepeat: '',
  // imgSrc: '',
  gender: 'male',
};

const RegistrationForm = (props) => {
  const [_, dispatch] = useContext(UserContext);

  const handleSubmit = async (values, formikBag) => {
    const { gender, ...restUser } = values;

    const newUserData = {
      ...restUser,
      isMale: gender === 'male',
    };

    // запам'ятовуємо у стані що робимо запит на сервер
    dispatch({ type: 'userRequest' });

    try {
      // запит на сервер
      const {
        data: {
          data: { user },
        },
      } = await registration(newUserData);
      // при успішному запиту зберігаємо юзера
      dispatch({ type: 'userSuccess', user });
    } catch (error) {
      // при неуспішному запиту зберігаємо помилку
      dispatch({ type: 'userError', error });
    }

    formikBag.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={USER_REGISTRATION_SCHEMA}
    >
      <Form className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor='firstName' className={styles.label}>
            First name:
          </label>
          <Field type='text' name='firstName' id='firstName' className={styles.input} />
        </div>
        <ErrorMessage name='firstName' component='div' className={styles.error} />
        <div className={styles.inputContainer}>
          <label htmlFor='lastName' className={styles.label}>
            Last name:
          </label>
          <Field type='text' name='lastName' id='lastName' className={styles.input} />
        </div>
        <ErrorMessage name='lastName' component='div' className={styles.error} />
        <div className={styles.inputContainer}>
          <label htmlFor='email' className={styles.label}>
            Email:
          </label>
          <Field type='email' name='email' id='email' className={styles.input} />
        </div>
        <ErrorMessage name='email' component='div' className={styles.error} />
        <div className={styles.inputContainer}>
          <label htmlFor='password' className={styles.label}>
            Password:
          </label>
          <Field type='password' name='password' id='password' className={styles.input} />
        </div>
        <ErrorMessage name='password' component='div' className={styles.error} />
        <div className={styles.inputContainer}>
          <label htmlFor='passwordRepeat' className={styles.label}>
            Repeat Password:
          </label>
          <Field
            type='password'
            name='passwordRepeat'
            id='passwordRepeat'
            className={styles.input}
          />
        </div>
        <ErrorMessage name='passwordRepeat' component='div' className={styles.error} />
        <fieldset className={styles.genderContainer}>
          <legend className={styles.genderHeading}>Gender: </legend>
          <div className={styles.radioContainer}>
            <Field type='radio' name='gender' id='male' value='male' />
            <label htmlFor='male' className={cx(styles.label, styles.radioLabel)}>
              Male
            </label>
          </div>
          <div className={styles.radioContainer}>
            <Field type='radio' name='gender' id='female' value='female' />
            <label htmlFor='female' className={cx(styles.label, styles.radioLabel)}>
              Female
            </label>
          </div>
          <ErrorMessage name='gender' component='div' className={styles.error} />
        </fieldset>
        <div className={styles.btnContainer}>
          <button type='submit' className={styles.btn}>
            Register
          </button>
          <button type='reset' className={styles.btn}>
            Reset fields
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
