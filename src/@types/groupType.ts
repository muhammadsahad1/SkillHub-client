import { Member } from "./membersType";

export interface IGroup {
  _id: string;
  groupName: string;
  creatorId: string;
  description: string;
  // creatorId: mongoose.Types.ObjectId;
  // members: mongoose.Types.ObjectId[];
  skills: string[];
  members: Member[];
  created_at?: Date;
  updated_at?: Date;
  groupImage?: string;
  groupImageUrl?: string;
  // pendingRequests: mongoose.Types.ObjectId[];
  // admin: mongoose.Types.ObjectId[];
}

export interface IMember {}
