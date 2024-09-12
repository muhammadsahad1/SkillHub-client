// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   getNotifications,
//   markNotificationAsRead,
// } from "../../API/notification";
// import { Notifications } from "@mui/icons-material";

// interface NotificationState {
//   unreadCount: number;
//   notifications: any[];
// }

// const initialState: NotificationState = {
//   unreadCount: 0,
//   notifications: [],
// };
// // for fetch all the notifications
// export const fetchNotifications = createAsyncThunk(
//   "notifications/fetchNotifications",
//   async () => {
//     const response = await getNotifications();
//     return response;
//   }
// );
// // for readint the notification
// export const readNotification = createAsyncThunk(
//   "notification/readNotificaion",
//   async (notificationId: string ) => {  
//     await markNotificationAsRead(notificationId);
//     return notificationId;
//   }
// );

// const notificationSlice = createSlice({
//   name: "notifications",
//   initialState,
//   reducers: {
//     addNotification :(state , action) => {
//       state.notifications = [action.payload,...state.notifications]
//       state.unreadCount += 1
//     },
//     removeAllNotifications : (state) => {
//       state.notifications = []
//       state.unreadCount = 0
//     }
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchNotifications.fulfilled, (state, action) => {
//       const notifications = action.payload;
//       state.notifications = notifications;
//       state.unreadCount = notifications.filter(
//         (notify: any) => !notify.read
//       ).length;
//     });

//     builder.addCase(readNotification.fulfilled, (state, action) => {
//       const notificationId = action.payload;
//       const notification = state.notifications.find(
//         (n) => n.id === notificationId
//       );
//       if (notification) {
//         notification.read = true;
//         state.unreadCount = Math.max(0, state.unreadCount - 1);
//       }
//     });
//   },
// });

// export const { removeAllNotifications } = notificationSlice.actions
// export default notificationSlice.reducer;


import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getNotifications,
  markNotificationAsRead,
} from "../../API/notification";

// Define and export the NotificationState interface
export interface NotificationState {
  unreadCount: number;
  notifications: Notification[];
}

// Define a Notification type
interface Notification {
  id: string;
  read: boolean;
  // Add other properties as needed
}

const initialState: NotificationState = {
  unreadCount: 0,
  notifications: [],
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await getNotifications();
    return response as Notification[];
  }
);

export const readNotification = createAsyncThunk(
  "notification/readNotification",
  async (notificationId: string) => {
    await markNotificationAsRead(notificationId);
    return notificationId;
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications = [action.payload, ...state.notifications];
      state.unreadCount += 1;
    },
    removeAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(
          (notify) => !notify.read
        ).length;
      })
      .addCase(readNotification.fulfilled, (state, action) => {
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

export const { addNotification, removeAllNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;