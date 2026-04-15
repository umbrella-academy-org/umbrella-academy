import { UserRole, OnboardingChecklist } from "./user";

export interface SidebarItem {
  icon: any;
  label: string;
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
  badge?: string;
  disabled?: boolean;
  disabledReason?: string;
}

export interface SidebarProps {
  activeItem?: string;
  userType?: UserRole;
  onboardingChecklist?: OnboardingChecklist;
}


export interface FormError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: FormError[];
  isSubmitting: boolean;
  isValid: boolean;
}