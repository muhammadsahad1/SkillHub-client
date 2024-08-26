import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Grid } from "@mui/material";
import { UploadFile } from "@mui/icons-material"; // Optional, for file upload icon

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: FormData) => void; // Function to handle form submission
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | ArrayBuffer>(""); // Store image preview URL
  const [registrationLink, setRegistrationLink] = useState("");
  const [accessLink, setAccessLink] = useState("");
  const [category, setCategory] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setBannerFile(file);
    }
  };
// for handling the sumbit and passing the formdata to parent component
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("duration", duration.toString());
    formData.append("speaker", speaker);
    formData.append("registrationLink", registrationLink);
    formData.append("accessLink", accessLink);
    formData.append("category", category);
    if (bannerFile) {
      formData.append("bannerFile", bannerFile);
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
          Create a New Event
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="time"
              label="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Speaker"
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFile />}
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Banner
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {bannerPreview && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Selected file preview:
                </Typography>
                <img
                  src={bannerPreview as string}
                  alt="Banner Preview"
                  style={{ width: "100%", height: "auto", borderRadius: 4 }}
                />
              </Box>
            )}
            <Typography variant="body2" color="textSecondary">
              {bannerFile ? `Selected file: ${bannerFile.name}` : null}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Registration Link"
              value={registrationLink}
              onChange={(e) => setRegistrationLink(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Access Link"
              value={accessLink}
              onChange={(e) => setAccessLink(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#18181b", // zinc-950 color
                "&:hover": {
                  backgroundColor: "#0f0f10",
                },
              }}
            >
              Create Event
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CreateEventModal;
