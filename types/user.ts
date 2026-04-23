export enum UserRole {
  STUDENT = 'student',
  GUARDIAN = 'guardian',
  TRAINER = 'trainer',
  SALES_MANAGER = 'sales_manager',
  ADMIN = 'admin'
}

export enum GuardianInviteState {
  INVITED = 'invited',
  ACTIVE = 'active',
  DECLINED = 'declined'
}



export interface OnboardingChecklist {
  accountCreated: boolean; 
  bookingPayed: boolean;
  subscriptionPayed: boolean;
  orientationBooked: boolean;
  roadmapReceived: boolean;
  learningStarted: boolean;
}

export interface Experience {
  yearsOfExperience: number;
  specializations: string[];
}


export interface BaseUser  {
  _id:string
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
  isActive: boolean;
  status: string;
  gender: string;
  dateOfBirth: Date;
  isVerified: boolean;
  otpCode: string;
  otpExpiry: Date;
  resetToken: string;
  resetTokenExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Guardian extends BaseUser {
  role: UserRole.GUARDIAN;
  linkedStudentIds: string[];
  inviteState: GuardianInviteState;
  inviteSentAt: Date;
  passwordSetAt: Date | null;
}

export interface Student extends BaseUser {
  role: UserRole.STUDENT;
  guardianIds: string[];
  hasPaidOrientation: boolean;
  hasActiveSubscription: boolean;
  subscriptionExpiryDate: Date | null;
  onboardingStatus: OnboardingChecklist;
  assignedTrainerId: string | null;
  currentRoadmapId: string | null;
}

export interface Trainer extends BaseUser {
  role: UserRole.TRAINER;
  cvUrl: string;
  experience: Experience;
  skills: string[];
  introVideoUrl: string;
  approvalStatus: 'pending' | 'approved' | 'rejected'
}


export interface StudentRegister extends BaseUser {
    guardianName: string;
    guardianEmail: string;
    guardianPhoneNumber: string;
}