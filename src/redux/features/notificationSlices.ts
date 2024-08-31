import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNotifications,
  markNotificationAsRead,
} from "../../API/notification";
import { Notifications } from "@mui/icons-material";

interface NotificationState {
  unreadCount: number;
  notifications: any[];
}

const initialState: NotificationState = {
  unreadCount: 0,
  notifications: [],
};
// for fetch all the notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await getNotifications();
    return response;
  }
);
// for readint the notification
export const readNotification = createAsyncThunk(
  "notification/readNotificaion",
  async (notificationId: string ) => {  
    await markNotificationAsRead(notificationId);
    return notificationId;
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification :(state , action) => {
      state.notifications = [action.payload,...state.notifications]
      state.unreadCount += 1
    },
    removeAllNotifications : (state,action) => {
      state.notifications = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      const notifications = action.payload;
      state.notifications = notifications;
      state.unreadCount = notifications.filter(
        (notify: any) => !notify.read
      ).length;
    });

    builder.addCase(readNotification.fulfilled, (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.find(
        (n) => n.id === notificationId
      );
      if (notification) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    });
  },
});

export default notificationSlice.reducer;
