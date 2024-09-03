import React, { useState } from "react";
import CreateGroup from "../../components/group/CreateGroup";
import NavBar from "../../components/common/navBar";
import { motion } from "framer-motion";
import GroupLists from "../../components/group/GroupLists";
import { Users } from "lucide-react";

const GroupPage = () => {
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const handleIsCreated = () => {
    setIsCreated(true);
  };

  return (
    <div className="bg-zinc-100 min-h-screen">
      <NavBar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-28"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-4xl font-extrabold text-gray-900 font-poppins mb-4">
              Spark Connections, Ignite Growth
            </h1>
            <p className="text-xxl text-gray-600 max-w-3xl mx-auto">
              Join vibrant communities where skills flourish and ideas take
              flight
            </p>
          </div>

          <div className="mb-12 flex justify-center items-center">
            <CreateGroup onCreated={handleIsCreated} />
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-10">
            <div className="bg-gradient-to-r from-zinc-900 to-teal-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white font-poppins flex items-center">
                <Users className="mr-2" size={28} />
                Discover Collaborative Groups
              </h2>
              <span className="bg-white text-zinc-900 font-poppins px-3 py-1 rounded-full text-sm font-semibold">
                Explore & Join
              </span>
            </div>
            <div className="p-6">
              <GroupLists isCreated={isCreated} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GroupPage;
