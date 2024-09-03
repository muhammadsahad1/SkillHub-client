import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import PostSpringModal from "../../post/MediaPostModal";
import useGetUser from "../../../hook/getUser";
import { postingThoughts } from "../../../API/conversation";
import { showToastError, showToastSuccess } from "./toast";
import EventModal from "../../event/EventModal";

const OutlinedCard: React.FC = () => {
  const [isOpen, setModalOpen] = useState<boolean>(false);
  const [thoughts, setThoughts] = useState<string | null>(null);
  const [isEventModalOpen, setEventModalOpen] = useState<boolean>(false);
  const [isThoughts, setIsThoughts] = useState<boolean>(false);

  const currentUser = useGetUser();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // for thoughts post
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thought = e.target.value;
    setThoughts(thought);
    if (thought.trim() === "") {
      setIsThoughts(false);
    } else {
      setThoughts(thought);
      setIsThoughts(true);
    }
  };

  // post the thoughts
  const postThougths = async (thoughts: string | null) => {
    try {
      const result = await postingThoughts(thoughts);
      if (result.success) {
        setThoughts("");
        showToastSuccess("Thoughts posted successfully");
      } else {
        showToastError(result.message);
      }
    } catch (error) {}
  };

  // for handle the event modal
  const handleEventModal = () => setEventModalOpen(true);
  const handleCloseEventModal = () => setEventModalOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "16px",
          boxShadow: 2,
          width: "100%",
          maxWidth: 600,
          mx: "auto",
          my: 4,
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: 14,
              marginBottom: 1,
              color: "black",
              fontWeight: "bold",
            }}
            color="text.secondary"
            gutterBottom
          >
            <span className="font-poppins">Word of the Day</span>
          </Typography>
          <Typography
            variant="h5"
            component="div"
            className="flex justify-between space-x-3"
          >
            <img
              src={currentUser?.picture?.imageUrl}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <input
              onChange={handleInputChange}
              value={(thoughts as string) || ""}
              type="text"
              placeholder="Share your thoughts..."
              className="mt-1 block w-full border text-sm border-gray-300 text-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 tracking-wider"
            />
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", padding: "16px" }}>
          {currentUser?.isProfessional && (
            <button
              className="shadow-md text-sm  w-26  px-6 py-2 font-poppins bg-zinc-900 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 tracking-wider"
              onClick={handleEventModal}
            >
              Create Events
            </button>
          )}
          {!isThoughts ? (
            <button
              className="shadow-md text-sm  w-26  px-6 py-2 font-poppins bg-zinc-900 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 tracking-wider"
              onClick={openModal}
            >
              Media
            </button>
          ) : (
            <button
              className="shadow-md text-sm px-6  w-26  py-2 font-poppins bg-zinc-900 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 tracking-wider"
              onClick={() => postThougths(thoughts)}
            >
              Post
            </button>
          )}
        </CardActions>
      </Card>
      <PostSpringModal isOpen={isOpen} onClose={closeModal} />
      {isEventModalOpen && (
        <EventModal isOpen={isEventModalOpen} onClose={handleCloseEventModal} />
      )}
    </Box>
  );
};

export default OutlinedCard;
