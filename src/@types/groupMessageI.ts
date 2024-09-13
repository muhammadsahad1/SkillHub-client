export interface GroupMessages {
  _id: string; // Message ID
  message: string; // The actual text message
  media?: string; // Optional media file link (image, video, etc.)
  createdAt: string; // Timestamp of the message creation
  readBy: string[]; // Array of user IDs who have read the message
  sender: {
    _id: string; // Sender's user ID
    name: string; // Sender's name
    userProfile: string; // URL or path to the sender's profile picture
  };
}