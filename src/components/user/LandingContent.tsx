import React from "react"
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const LandingContent : React.FC = () => (
    <div className="space-y-20 text-center bg-gray-100 text-zinc-900">
      <motion.section
        className="flex flex-col items-center justify-center min-h-screen px-4 space-y-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-4xl font-bold sm:text-5xl">
          Welcome to SkillHub
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl">
          A platform to enhance and share your skills with like-minded professionals. 
          Learn from experts, showcase your talents, and grow your network.
        </p>
       
        <Link to="/auth/userSignup">
          <Button
            sx={{
              background: "#18181b",
              color: "whitesmoke",
              "&:hover": { background: "#18181b", transform: "scale(1.05)" },
              letterSpacing: 2,
            }}
          >
            Get Started
          </Button>
        </Link>
      </motion.section>
  
      {/* Events Feature Section */}
      <motion.section
        className="flex flex-col items-center justify-center px-4 py-10 bg-white"
        initial="hidden"
        whileInView="visible"
        variants={slideUp}
      >
        <h2 className="text-3xl font-bold">Host and Join Events</h2>
        <p className="text-lg sm:text-xl max-w-xl">
          Participate in online events, share your knowledge, and join live video 
          call meetings to learn from experts in real-time.
        </p>
      
      </motion.section>
  
      {/* Interaction Feature Section */}
      <motion.section
        className="flex flex-col items-center justify-center px-4 py-10 bg-gray-200"
        initial="hidden"
        whileInView="visible"
        variants={slideUp}
      >
        <h2 className="text-3xl font-bold">Interact with Users</h2>
        <p className="text-lg sm:text-xl max-w-xl">
          Chat and video call with users who share your skills. Collaborate on projects, 
          get feedback, and grow together.
        </p>
      </motion.section>
  
      {/* Groups Feature Section */}
      <motion.section
        className="flex flex-col items-center justify-center px-4 py-10 bg-white"
        initial="hidden"
        whileInView="visible"
        variants={slideUp}
      >
        <h2 className="text-3xl font-bold">Join Groups & Discuss</h2>
        <p className="text-lg sm:text-xl max-w-xl">
          Join groups based on your interests, discuss doubts, and collaborate with others to solve problems.
        </p>
        
      </motion.section>
  
      {/* Call to Action Section */}
      <motion.section
        className="flex flex-col items-center justify-center px-4 py-10 bg-gray-100"
        initial="hidden"
        whileInView="visible"
        variants={slideUp}
      >
        <h2 className="text-3xl font-bold">Ready to Showcase Your Skills?</h2>
        <p className="text-lg sm:text-xl max-w-xl">
          Share your expertise by posting content, uploading videos, and connecting with a community that values learning and collaboration.
        </p>
        <div className="flex space-x-4 mt-8">
          <Link to="/auth/userSignup">
            <Button
              sx={{
                background: "#18181b",
                color: "whitesmoke",
                letterSpacing: 2,
                "&:hover": { background: "#18181b", transform: "scale(1.05)" },
              }}
            >
              Register Now
            </Button>
          </Link>
          <Link to="/auth/userLogin">
            <Button
              sx={{
                background: "#18181b",
                color: "whitesmoke",
                letterSpacing: 2,
                "&:hover": { background: "#18181b", transform: "scale(1.05)" },
              }}
            >
              Login
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );

export default LandingContent