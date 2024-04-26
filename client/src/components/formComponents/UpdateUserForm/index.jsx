import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import cx from 'classnames';
import { USER_UPDATE_SCHEMA } from '../../../validation/userValidation';
import UserContext from '../../../contexts/userContext';
import styles from './UpdateUserForm.module.scss';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordRepeat: '',
  // imgSrc: '',
  gender: '',
};

const UpdateUserForm = (props) => {
  const [{ user }, dispatch] = useContext(UserContext);

  const handleSubmit = (values, formikBag) => {
    const updatedUserFields = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value !== '' && key !== 'gender') {
        updatedUserFields[key] = value;
      } else if (value !== '' && key === 'gender') {
        updatedUserFields.isMale = value === 'male';
      }
    });

    console.log(updatedUserFields);

    // TODO переробити на запит на сервер
    dispatch({
      type: 'userSuccess',
      user: {
        ...user,
        ...updatedUserFields,
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={USER_UPDATE_SCHEMA}
    >
      <Form className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor='firstName' className={styles.label}>
            First name:
          </label>
          <Field
            type='text'
            name='firstName'
            id='firstName'
            className={styles.input}
          />
        </div>
        <ErrorMessage
          name='firstName'
          component='div'
          className={styles.error}
        />
        <div className={styles.inputContainer}>
          <label htmlFor='lastName' className={styles.label}>
            Last name:
          </label>
          <Field
            type='text'
            name='lastName'
            id='lastName'
            className={styles.input}
          />
        </div>
        <ErrorMessage
          name='lastName'
          component='div'
          className={styles.error}
        />
        <div className={styles.inputContainer}>
          <label htmlFor='email' className={styles.label}>
            Email:
          </label>
          <Field
            type='email'
            name='email'
            id='email'
            className={styles.input}
          />
        </div>
        <ErrorMessage name='email' component='div' className={styles.error} />
        <div className={styles.inputContainer}>
          <label htmlFor='password' className={styles.label}>
            Password:
          </label>
          <Field
            type='password'
            name='password'
            id='password'
            className={styles.input}
          />
        </div>
        <ErrorMessage
          name='password'
          component='div'
          className={styles.error}
        />
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
        <ErrorMessage
          name='passwordRepeat'
          component='div'
          className={styles.error}
        />
        <fieldset className={styles.genderContainer}>
          <legend className={styles.genderHeading}>Gender: </legend>
          <div className={styles.radioContainer}>
            <Field type='radio' name='gender' id='male' value='male' />
            <label
              htmlFor='male'
              className={cx(styles.label, styles.radioLabel)}
            >
              Male
            </label>
          </div>
          <div className={styles.radioContainer}>
            <Field type='radio' name='gender' id='female' value='female' />
            <label
              htmlFor='female'
              className={cx(styles.label, styles.radioLabel)}
            >
              Female
            </label>
          </div>
          <ErrorMessage
            name='gender'
            component='div'
            className={styles.error}
          />
        </fieldset>
        <div className={styles.btnContainer}>
          <button type='submit' className={styles.btn}>
            Update data
          </button>
          <button type='reset' className={styles.btn}>
            Reset fields
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default UpdateUserForm;
