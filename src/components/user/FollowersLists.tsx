import React, { useState } from "react";
import { User } from "../../@types/allTypes";

const followers = [
  {
    id: 1,
    name: "Arunachalam Muruganantham",
    location: "Chennai, India",
    profilePic: "path/to/profilePic1.jpg",
  },
  {
    id: 2,
    name: "Kishore Kumar",
    location: "Pondicherry, India",
    profilePic: "path/to/profilePic2.jpg",
  },
  // Add more followers as needed
];
const FollowersLists = () => {
  // const [followers, setFollowers] = useState<User[]>([]);



  return (
    <div className="max-w-6xl mx-auto p-4 mt-28">
      <h2 className="text-xl font-semibold mb-4">People who followed you</h2>
      <div className="space-y-4">
        {followers.map((follower) => (
          <div
            key={follower.id}
            className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={follower.profilePic}
                alt={follower.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900">{follower.name}</h3>
                <p className="text-sm text-gray-600">{follower.location}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="shadow-[inset_0_0_0_2px_#616467]  text-black px-3 py-1  rounded-md tracking-widest  font-bold bg-transparent hover:bg-[#18181b] hover:text-white dark:text-neutral-200 transition duration-200">
                Follow
              </button>
              <button className="font-semibold px-3 py-1 rounded-md bg-gray-300 text-gray-700  hover:bg-gray-400">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowersLists;
