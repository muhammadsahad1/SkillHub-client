export enum PostType {
  IMAGE = "image",
  VIDEO = "video",
  THOUGHTS = "thoughts",
}

export interface IPost {
  caption: string;
  comments: [
    {
      userId: string;
      userName: string;
      comment: string;
      created_at: Date;
    }
  ];
  createdAt: string;
  imageName: string;
  isProfessional: boolean;
  likes: string[];
  postImageUrl: string;
  reports: string[];
  saves: string[];
  type: "image" | "video" | "thoughts";
  updatedAt: string;
  userId: string;
  userImageUrl: string;
  userName: string;
  _id: string;
}
