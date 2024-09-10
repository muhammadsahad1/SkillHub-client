// Interface for each month data entry
export interface MergedData {
  name: string;  // Month name like 'Jan', 'Feb', etc.
  posts: number; // Count of posts
  users: number; // Count of users
  events: number; // Count of events
  groups: number; // Count of groups
}

// Interface for backend response
export interface AnalyticsResponse {
  postData: Array<{ _id: { month: number, year: number }, count: number }>;
  groupData: Array<{ _id: { month: number, year: number }, count: number }>;
  eventData: Array<{ _id: { month: number, year: number }, count: number }>;
  userData: Array<{ _id: { month: number, year: number }, count: number }>;
}