// Form component type definitions

export interface FormInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'date' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface FormSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}