// Component props and UI-related type definitions

import { UserType } from './user';
import { RoadmapPhase } from './roadmap';

export interface SidebarItem {
  icon: any;
  label: string;
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
  badge?: string;
}

export interface SidebarProps {
  activeItem?: string;
  userType?: UserType;
}

export interface RoadmapBuilderProps {
  onSave: (roadmapData: {
    goal: string;
    phases: RoadmapPhase[];
    totalEstimatedWeeks: number;
  }) => void;
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