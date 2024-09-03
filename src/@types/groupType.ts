export interface IGroup {
  _id : string,
  groupName: string;
  description: string;
  // creatorId: mongoose.Types.ObjectId;
  // members: mongoose.Types.ObjectId[];
  skills: string[];
  created_at?: Date;
  updated_at?: Date;
  groupImage?: string;
  groupImageUrl?: string;
  // pendingRequests: mongoose.Types.ObjectId[];
  // admin: mongoose.Types.ObjectId[];
}