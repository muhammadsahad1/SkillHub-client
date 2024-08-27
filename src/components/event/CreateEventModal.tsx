import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormHelperText,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material"; // Optional, for file upload icon
import { eventValidation } from "../../utils/validation";
import { BarLoader } from "react-spinners";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxHeight: "80vh", // Ensure the modal does not exceed 80% of the viewport height
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
  const logFormData = (formData: FormData) => {
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log("FormData:", data);
  };

  // for handling the sumbit and passing the formdata to parent component
  const handleSubmit = () => {
    const validationErrors = eventValidation(
      title,
      description,
      date,
      time,
      duration,
      speaker,
      registrationLink,
      accessLink,
      bannerFile
    );
    console.log(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
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
      logFormData(formData);
      onSubmit(formData);
      onClose();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        {/* {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
            <BarLoader color="black" />
          </div>
        )} */}
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
              error={!!errors.title}
              helperText={errors.title}
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
              error={!!errors.description}
              helperText={errors.description}
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
              error={!!errors.date}
              helperText={errors.date}
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
              error={!!errors.time}
              helperText={errors.time}
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
              error={!!errors.duration}
              helperText={errors.duration}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Speaker"
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
              error={!!errors.speaker}
              helperText={errors.speaker}
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
            {errors.bannerFile && (
              <FormHelperText error>{errors.bannerFile}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Registration Link"
              value={registrationLink}
              onChange={(e) => setRegistrationLink(e.target.value)}
              error={!!errors.registrationLink}
              helperText={errors.registrationLink}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Access Link"
              value={accessLink}
              onChange={(e) => setAccessLink(e.target.value)}
              error={!!errors.accessLink}
              helperText={errors.accessLink}
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
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
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
