import OutlinedCard from "../common/utilies/PostCard";
import { motion } from "framer-motion";

const PostCard = () => {
  return (
    <motion.div
      className="mt-7 flex justify-center w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 8, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <OutlinedCard />
    </motion.div>
  );
};

export default PostCard;
