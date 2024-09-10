export interface User {
  isProfessional: any;
  followers: any;
  following: any;
  states?: string;
  id?: string;
  name: string;
  email: string;
  role?: string;
  blocked?: boolean;
  phoneNumber?: string;
  profileImage?: string | ArrayBuffer | null | Blob;
  coverImage?: string | ArrayBuffer | null | Blob;
  created_at?: string;
  updated_at?: Date;
  bio: string;
  city: string;
  country: string;
  skill: string;
  profile?: boolean;
  picture?: string;
  approved?: boolean;
  email_notification?: boolean;
  sms_notification?: boolean;
  contactVisibility?: string;
  profileVisibility?: string;
  passwordLastChanged?: Date;
  _id?: string;
  status?: string;

}
