export interface IEvent {
  _id: string,
  title: string;
  description: string;
  date: Date;
  time: string;
  duration: number;
  speaker: string;
  category: string;
  bannerName?: string;
  registrationLink: string;
  accessLink: string;
  isPublic: boolean;
  attendees: string[];
  eventStatus: string;
  approvalStatus: string;
  createdBy: string[];
  bannerImageUrl? :string,  
  createdAt: Date;
  updatedAt: Date;
}
