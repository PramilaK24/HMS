import React, { useMemo, useCallback, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import loginIllustration from '../../assets/login/LoginPage.png';
import './Login.scss';
import { INITIAL_VALUES, validate, } from './utils';


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = useCallback((values, { setSubmitting, resetForm }) => {
    try {
      console.log('Login submitted', values);
      resetForm({ values: { ...INITIAL_VALUES, rememberMe: values.rememberMe } });
      navigate('/dashboard', { replace: true });
    } finally {
      setSubmitting(false);
    }
  }, [navigate]);

  const isSubmitDisabled = useMemo(() => false, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-visual-panel" aria-label="Healthcare login illustration">
          <img src={loginIllustration} alt="Healthcare illustration" className="login-visual" />
        </div>

        <div className='login-container'>
          <div className="login-card">
          <h1 className="login-card__title">
            Welcome to <span className="accent">Stacklycare</span>
          </h1>
          <p className="login-card__subtitle">Life is Happy when you are Healthy</p>

          <Formik
            initialValues={INITIAL_VALUES}
            validate={validate}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
              <Form className="login-form" noValidate>
                <Field name="userName">
                  {({ field }) => (
                    <TextField
                      {...field}
                      className="login-field"
                      variant="outlined"
                      placeholder="Username"
                      value={values.userName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.userName && errors.userName)}
                      helperText={touched.userName && errors.userName ? errors.userName : ' '}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon icon="mdi:user-outline" width={18} height={18} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>

                <Field name="password">
                  {({ field }) => (
                    <TextField
                      {...field}
                      className="login-field"
                      variant="outlined"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password ? errors.password : ' '}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon icon="mdi:lock-outline" width={18} height={18} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                              className="password-toggle"
                              onClick={togglePasswordVisibility}
                              type="button"
                            >
                              <Icon icon={showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} width={18} height={18} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>

                <div className="login-form__footer">
                  <FormControlLabel
                    className="login-checkbox"
                    control={
                      <Checkbox
                        checked={values.rememberMe}
                        onChange={(event) => setFieldValue('rememberMe', event.target.checked)}
                        name="rememberMe"
                      />
                    }
                    label="Remember me"
                  />

                  <Button className="login-link" variant="text" type="button">
                    Forgot Password?
                  </Button>
                </div>

                <Button
                  className="login-primary-btn"
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting || isSubmitDisabled}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>

                <Button className="login-alt-btn" variant="outlined" fullWidth type="button">
                  Or Continue with
                </Button>

                <div className="login-social-row">
                  <Button className="login-social-btn" variant="contained" aria-label="Continue with Google" type="button">
                    <Icon icon="flat-color-icons:google" />
                  </Button>

                  <Button className="login-social-btn" variant="contained" aria-label="Continue with Apple" type="button">
                    <Icon icon="bi:apple" />
                  </Button>
                </div>

                <Typography className="login-signup">
                  Don&apos;t have an account? <span className="login-signup__link">Sign Up</span>
                </Typography>
              </Form>
            )}
          </Formik>
        </div>
         <div className="login-brand">Stacklycare</div>
        </div>
      </div>

     
    </div>
  );
};

export default Login;
