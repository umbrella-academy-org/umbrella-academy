// Email validation
export const validateEmail = (email: string): string => {
  if (!email) return 'Email is required';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email address';
  return '';
};

// Password validation
export const validatePassword = (password: string): string => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain at least one special character';
  if (!/\d/.test(password)) return 'Password must contain at least one number';
  return '';
};

// Password confirmation validation
export const validatePasswordConfirmation = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return '';
};

// OTP validation
export const validateOTP = (otp: string[]): string => {
  const otpValue = otp.join('');
  if (otpValue.length !== 6) return 'Please enter the complete 6-digit code';
  if (!/^\d{6}$/.test(otpValue)) return 'OTP must contain only numbers';
  return '';
};

// Phone number validation
export const validatePhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return 'Phone number is required';
  if (phoneNumber.length < 7) return 'Please enter a valid phone number';
  return '';
};

// Required field validation
export const validateRequired = (value: string, fieldName: string): string => {
  if (!value || !value.trim()) return `${fieldName} is required`;
  return '';
};

// Text length validation
export const validateTextLength = (text: string, minLength: number, fieldName: string): string => {
  if (text.length < minLength) return `${fieldName} must be at least ${minLength} characters`;
  return '';
};

// Password strength checker
export const getPasswordStrength = (password: string) => {
  return {
    hasMinLength: password.length >= 8,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    hasNumber: /\d/.test(password),
    has: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
  };
};