import React, { FC, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { save, selectSettings, SettingsForm } from './settingsSlice';
import * as Yup from 'yup';
import styles from './Settings.module.css';

const SettingsSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const Settings: FC = () => {
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  const onSubmit = useCallback(
    values => {
      dispatch(save(values));
    },
    [dispatch],
  );
  return (
    <>
      <h1>Settings</h1>
      <Formik<SettingsForm>
        initialValues={settings}
        validationSchema={SettingsSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="First Name" />
            <div className={styles.errorMessage}>
              <ErrorMessage className={styles.errorMessage} name="firstName" />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Last Name" />
            <div className={styles.errorMessage}>
              <ErrorMessage className={styles.errorMessage} name="lastName" />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" placeholder="Email" />
            <div className={styles.errorMessage}>
              <ErrorMessage name="email" />
            </div>
          </div>

          <button className={styles.submitButton} type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};

export { Settings };
