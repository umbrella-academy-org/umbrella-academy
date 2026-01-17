// Auth flow management utilities

export type UserType = 'student' | 'mentor';
export type AuthFlow = 'signup' | 'reset-password';

// Storage keys
const STORAGE_KEYS = {
  USER_TYPE: 'userType',
  SIGNUP_EMAIL: 'signupEmail',
  RESET_EMAIL: 'resetEmail',
  AUTH_FLOW: 'authFlow',
} as const;

// Get user type from localStorage
export const getUserType = (): UserType | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.USER_TYPE) as UserType | null;
};

// Set user type in localStorage
export const setUserType = (userType: UserType): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER_TYPE, userType);
};

// Get signup email from localStorage
export const getSignupEmail = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.SIGNUP_EMAIL);
};

// Set signup email in localStorage
export const setSignupEmail = (email: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SIGNUP_EMAIL, email);
};

// Get reset email from localStorage
export const getResetEmail = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.RESET_EMAIL);
};

// Set reset email in localStorage
export const setResetEmail = (email: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.RESET_EMAIL, email);
};

// Get auth flow from localStorage
export const getAuthFlow = (): AuthFlow | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.AUTH_FLOW) as AuthFlow | null;
};

// Set auth flow in localStorage
export const setAuthFlow = (flow: AuthFlow): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.AUTH_FLOW, flow);
};

// Get current email (signup or reset)
export const getCurrentEmail = (): string => {
  return getSignupEmail() || getResetEmail() || 'johndoe@example.com';
};

// Clear all auth data
export const clearAuthData = (): void => {
  if (typeof window === 'undefined') return;
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// Get next route after password creation based on user type
export const getNextRouteAfterPassword = (): string => {
  const userType = getUserType();
  if (userType === 'mentor') {
    return '/auth/mentor/profile';
  }
  return '/auth/student/profile';
};

// Get next route after OTP verification based on auth flow
export const getNextRouteAfterOTP = (): string => {
  const authFlow = getAuthFlow();
  if (authFlow === 'reset-password') {
    return '/auth/reset-password';
  }
  return '/auth/create-password';
};