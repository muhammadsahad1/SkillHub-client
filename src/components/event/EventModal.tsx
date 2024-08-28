import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import CreateEventModal from "./CreateEventModal";
import { createEvent } from "../../API/event";
import { showToastSuccess } from "../common/utilies/toast";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface eventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<eventModalProps> = ({ isOpen, onClose }) => {
  const [isCreateEventInfoOpen, setCreateEventInfoOpen] =
    useState<boolean>(false);
  const [isCreateEventOpen, setCreateEventOpen] = useState<boolean>(false);

  useEffect(() => {
    setCreateEventInfoOpen(true);
  }, [isOpen]);

  const handleClose = () => {
    setCreateEventInfoOpen(false);
    setCreateEventOpen(false);
    onClose();
  };

  const handleOpenCreateModal = () => {
    setCreateEventInfoOpen(false);
    setCreateEventOpen(true);
  };
  const handleCloseModal = () => {
    setCreateEventInfoOpen(false);
    setCreateEventOpen(false);
    onClose();
  };

  const handleSubmit = async (eventData: FormData) => {
    onClose();
    const result = await createEvent(eventData);
    if (result.success) {
      showToastSuccess(result.message);
    } else {
      showToastError(result.message);
    }
  };

  return (
    <div>
      <Modal
        open={isCreateEventInfoOpen}
        onClose={handleClose}
        aria-labelledby="first-modal-title"
        aria-describedby="first-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="first-modal-title"
            sx={{
              mt: 2,
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              fontSize: 30,
              textAlign: "center",
            }}
          >
            Create an Event That Inspires!
          </Typography>
          <Typography
            id="first-modal-description"
            sx={{
              mt: 2,
              fontFamily: "Poppins, sans-serif",
              fontSize: 16,
              textAlign: "justify",
            }}
          >
            <span style={{ fontWeight: "bold" }}>
              Hosting an event is your opportunity to make meaningful
              connections, share knowledge, and inspire growth within your
              community.
            </span>{" "}
            Here’s how you can craft an event that truly resonates:
            <ul
              style={{
                marginTop: "16px",
                marginLeft: "20px",
                listStyleType: "disc",
                lineHeight: "1.6",
              }}
            >
              <li>
                <strong>Identify Your Impact:</strong> Think about the value
                your event will bring to others and how it can help them enhance
                their skills or discover new passions.
              </li>
              <li>
                <strong>Choose the Perfect Time:</strong> Select a date and time
                that works best for you and your audience to maximize
                engagement.
              </li>
              <li>
                <strong>Create an Eye-Catching Banner:</strong> Design a banner
                that not only represents your event but also grabs attention and
                excites potential participants.
              </li>
              <li>
                <strong>Select a Relevant Category:</strong> Pick a category
                that aligns with your event’s theme to reach the right audience.
              </li>
              <li>
                <strong>Fill in the Details:</strong> Complete the upcoming form
                with all the essential details to make your event a success.
              </li>
            </ul>
            <span
              style={{
                fontWeight: "bold",
                display: "block",
                marginTop: "16px",
              }}
            >
              Ready to make a difference? Click the "Proceed" button below to
              start creating your event and watch your network grow!
            </span>
          </Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleOpenCreateModal}
              sx={{
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Proceed
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for creating event goes here */}
      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EventModal;
