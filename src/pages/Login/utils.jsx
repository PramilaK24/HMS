export const INITIAL_VALUES = {
  userName: '',
  password: '',
  rememberMe: true,
};

export const validateUserName = (value) => {
  if (!value) return 'Username is required.';
  if (value.trim().length < 6) return 'Username must be at least 6 characters.';
  if (!/^[a-zA-Z0-9]+$/.test(value.trim())) {
    return 'Username must be alphanumeric only.';
  }
  return '';
};

export const validatePassword = (value) => {
  if (!value) return 'Password is required.';
  if (value.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter.';
  if (!/[0-9]/.test(value)) return 'Password must contain at least one number.';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'Password must contain at least one special character.';
  return '';
};

export const validate = (values) => {
  const errors = {};

  const userNameError = validateUserName(values.userName);
  const passwordError = validatePassword(values.password);

  if (userNameError) errors.userName = userNameError;
  if (passwordError) errors.password = passwordError;

  return errors;
};