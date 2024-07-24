export interface User {
  states: ReactNode;
  id?: string;
  name: string;
  email: string;
  role?: string;
  blocked?: boolean;
  phoneNumber?: string;
  profileImage: string | ArrayBuffer | null | Blob;
  created_at?: Date;
  updated_at?: Date;
  bio: string;
  city: string;
  country: string;
  skill: string;
  profile?:boolean;
  picture? :string;
  approved?: boolean; 
  email_notification?: boolean;
  sms_notification?: boolean;
  contactVisibility?: string;
  profileVisibility?: string;
  passwordLastChanged?: Date;
}


