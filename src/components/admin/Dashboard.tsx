import React, { useEffect, useState, forwardRef, memo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxisProps,
  YAxisProps,
} from "recharts";
import SideBar from "./layouts/SideBar";
import { fetchAnalyticsData } from "../../API/admin";
import { showToastError } from "../common/utilies/toast";
import useGetUser from "../../hook/getUser";

// Custom XAxis component
const CustomXAxis = memo(
  forwardRef<SVGElement, XAxisProps>((props, ref) => {
    return (
      <XAxis
        {...props}
        ref={ref}
        tick={{ fontSize: 10 }}
        tickFormatter={(value) => value.split(" ")[0]}
      />
    );
  })
);

CustomXAxis.displayName = "CustomXAxis";

// Custom YAxis component
const CustomYAxis = memo(
  forwardRef<SVGElement, YAxisProps>((props, ref) => {
    return <YAxis {...props} ref={ref} tick={{ fontSize: 10 }} />;
  })
);

CustomYAxis.displayName = "CustomYAxis";

// Define MergedData with possible keys
interface MergedData {
  name: string;
  posts: number;
  groups: number;
  events: number;
  users: number;
}

// Utility to merge the monthly data into a unified format
const mergeAnalyticsData = (
  postData: any[],
  groupData: any[],
  eventData: any[],
  userData: any[]
): MergedData[] => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const mergedData: { [key: string]: MergedData } = {};

  const addData = (dataArray: any[], key: keyof MergedData) => {
    dataArray.forEach((item) => {
      const monthYear = `${monthNames[item._id.month - 1]} ${item._id.year}`;
      if (!mergedData[monthYear]) {
        mergedData[monthYear] = {
          name: monthYear,
          posts: 0,
          groups: 0,
          events: 0,
          users: 0,
        };
      }
      (mergedData[monthYear] as any)[key] = item.count || 0;
    });
  };

  addData(postData, "posts");
  addData(groupData, "groups");
  addData(eventData, "events");
  addData(userData, "users");

  return Object.values(mergedData);
};

const Dashboard = () => {
  const [chartData, setChartData] = useState<MergedData[]>([]);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [groupsCount, setGroupsCount] = useState<number>(0);
  const [eventsCount, setEventsCount] = useState<number>(0);
  const [usersCount, setUsersCount] = useState<number>(0);

  const admin = useGetUser();

  const fetchDashboardData = async () => {
    try {
      const result = await fetchAnalyticsData();
      if (result) {
        const {
          postsCount,
          eventsCount,
          usersCount,
          groupsCount,
          analyticsData,
        } = result;
        setPostsCount(postsCount);
        setEventsCount(eventsCount);
        setUsersCount(usersCount);
        setGroupsCount(groupsCount);

        const mergedData = mergeAnalyticsData(
          analyticsData.postData,
          analyticsData.groupData,
          analyticsData.eventData,
          analyticsData.userData
        );
        setChartData(mergedData);
      } else {
        showToastError("Failed to fetch Dashboard Data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data", error);
      showToastError("Failed to fetch Dashboard Data");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [admin.id]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
        <div className="max-w-full lg:max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            Dashboard
          </h1>

          {/* Counts Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-sm font-medium text-gray-500 mb-2">Posts</h2>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                {postsCount.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-sm font-medium text-gray-500 mb-2">Groups</h2>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                {groupsCount.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-sm font-medium text-gray-500 mb-2">Events</h2>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                {eventsCount.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-sm font-medium text-gray-500 mb-2">Users</h2>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                {usersCount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Analytics Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Analytics Overview
            </h2>
            <div className="h-48 sm:h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <CustomXAxis dataKey="name" />
                  <CustomYAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="posts" fill="#8884d8" />
                  <Bar dataKey="users" fill="#82ca9d" />
                  <Bar dataKey="events" fill="#ffc658" />
                  <Bar dataKey="groups" fill="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
