import { eventAttendees } from "./eventAttend";

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  duration: number;
  speaker: string;
  price: string;
  currency : string;
  category: string;
  bannerName?: string;
  registrationLink: string;
  accessLink: string;
  isPublic: boolean;
  attendees: eventAttendees[];
  eventStatus: string;
  approvalStatus: string;
  createdBy: string;
  bannerImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
