import React, { useMemo, useCallback, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import loginIllustration from '../../assets/login/LoginPage.png';
import { INITIAL_VALUES, validate } from './utils';

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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050d0a]">
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
        <div className="flex w-full max-w-100vw items-center justify-center gap-8 lg:gap-24 xl:gap-24">
          <div
            className="relative hidden min-h-[440px] w-[min(44vw,560px)] items-center justify-center lg:flex"
            aria-label="Healthcare login illustration"
          >
            <img
              src={loginIllustration}
              alt="Healthcare illustration"
              className="block h-auto w-full max-w-[560px] drop-shadow-[0_20px_30px_rgba(14,255,123,0.12)]"
            />
          </div>

          <div className="relative flex flex-col items-center justify-center">
            <div className="w-full max-w-[460px] rounded-[26px] border border-emerald-400/20 bg-[#070d0c]/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_40px_rgba(0,0,0,0.38)] backdrop-blur-md sm:p-7">
              <h1 className="m-0 text-[clamp(2rem,2vw,2.5rem)] font-bold leading-[1.2] tracking-[-0.03em] text-[#f3fff8]">
                Welcome to <span className="text-[#0eff7b]">Stacklycare</span>
              </h1>
              <p className="mt-1.5 text-sm text-white/70">Life is Happy when you are Healthy</p>

              <Formik initialValues={INITIAL_VALUES} validate={validate} onSubmit={handleSubmit} enableReinitialize>
                {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
                  <Form className="mt-6 flex flex-col gap-4" noValidate>
                    <Field name="userName">
                      {({ field, meta }) => (
                        <div className="w-full">
                          <div className="flex items-center rounded-xl border border-emerald-400/25 bg-emerald-950/10 px-3 transition focus-within:border-emerald-400/50 focus-within:shadow-[0_0_0_1px_rgba(14,255,123,0.1)]">
                            <span className="flex h-5 w-5 items-center justify-center text-[#0eff7b]">
                              <Icon icon="mdi:user-outline" width={18} height={18} />
                            </span>
                            <input
                              {...field}
                              type="text"
                              placeholder="Username"
                              value={values.userName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`w-full bg-transparent px-3 py-[14px] text-[0.96rem] text-white placeholder:text-white/50 focus:outline-none ${
                                meta.touched && meta.error ? 'border-red-400/80' : ''
                              }`}
                            />
                          </div>
                          {meta.touched && meta.error ? (
                            <p className="mt-1.5 text-xs leading-[1.4] text-red-300">{meta.error}</p>
                          ) : (
                            <p className="mt-1.5 h-4 text-xs leading-[1.4] text-transparent">&nbsp;</p>
                          )}
                        </div>
                      )}
                    </Field>

                    <Field name="password">
                      {({ field, meta }) => (
                        <div className="w-full">
                          <div className="flex items-center rounded-xl border border-emerald-400/25 bg-emerald-950/10 px-3 transition focus-within:border-emerald-400/50 focus-within:shadow-[0_0_0_1px_rgba(14,255,123,0.1)]">
                            <span className="flex h-5 w-5 items-center justify-center text-[#0eff7b]">
                              <Icon icon="mdi:lock-outline" width={18} height={18} />
                            </span>
                            <input
                              {...field}
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`w-full bg-transparent px-3 py-[14px] text-[0.96rem] text-white placeholder:text-white/50 focus:outline-none ${
                                meta.touched && meta.error ? 'border-red-400/80' : ''
                              }`}
                            />
                            <button
                              type="button"
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                              onClick={togglePasswordVisibility}
                              className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-emerald-400/10 text-[#0eff7b] transition hover:bg-emerald-400/15 focus:outline-none"
                            >
                              <Icon icon={showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} width={18} height={18} />
                            </button>
                          </div>
                          {meta.touched && meta.error ? (
                            <p className="mt-1.5 text-xs leading-[1.4] text-red-300">{meta.error}</p>
                          ) : (
                            <p className="mt-1.5 h-4 text-xs leading-[1.4] text-transparent">&nbsp;</p>
                          )}
                        </div>
                      )}
                    </Field>

                    <div className="mt-1 flex items-center justify-between gap-3">
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-white/70">
                        <input
                          type="checkbox"
                          checked={values.rememberMe}
                          onChange={(event) => setFieldValue('rememberMe', event.target.checked)}
                          name="rememberMe"
                          className="h-4 w-4 rounded border-emerald-400/60 bg-transparent text-[#0eff7b] focus:ring-emerald-400/50"
                        />
                        Remember me
                      </label>

                      <button type="button" className="text-xs font-medium text-[#0eff7b] transition hover:text-emerald-300">
                        Forgot Password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || isSubmitDisabled}
                      className="w-full rounded-xl border border-emerald-400/30 bg-gradient-to-r from-emerald-400/20 to-emerald-700/40 px-4 py-3 text-base font-semibold text-[#effff6] shadow-none transition hover:from-emerald-400/30 hover:to-emerald-700/50 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>

                    <button
                      type="button"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-[10px] text-base font-semibold text-white/90 transition hover:bg-white/[0.04]"
                    >
                      Or Continue with
                    </button>

                    <div className="mt-1 flex justify-center gap-3.5">
                      <button
                        type="button"
                        aria-label="Continue with Google"
                        className="flex h-[54px] w-[54px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08]"
                      >
                        <Icon icon="flat-color-icons:google" width={22} height={22} />
                      </button>

                      <button
                        type="button"
                        aria-label="Continue with Apple"
                        className="flex h-[54px] w-[54px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08]"
                      >
                        <Icon icon="bi:apple" width={22} height={22} />
                      </button>
                    </div>

                    <p className="mt-3 text-center text-[0.9rem] text-white/70">
                      Don&apos;t have an account? <span className="font-semibold text-[#0eff7b]">Sign Up</span>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>

            
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-[24px] left-[70%] hidden -translate-x-1/2 select-none lg:block">
          <div className="bg-gradient-to-b from-transparent px-2 py-1">
            <p className="m-0 font-[General_Sans_Variable] text-[108.04px] font-bold not-italic leading-[100%] tracking-[10%] text-white/10">
              Stacklycare
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
