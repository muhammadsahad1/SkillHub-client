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
  const [price, setPrice] = useState<number>(0); // Add price state
  const [currency, setCurrency] = useState<string>("USD"); // Add currency state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

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
      bannerFile,
      price,
      currency
    );

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
      formData.append("price", price.toString());
      formData.append("currency", currency);
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
        {/* {loading && (
          <div className="inset-0 z-50 absolute bg-white bg-opacity-75 flex items-center justify-center ">
            <BarLoader />
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
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Price (0 for Free)"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              error={!!errors.price}
              helperText={errors.price}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              error={!!errors.currency}
              helperText={errors.currency}
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
              <Box
                component="img"
                src={bannerPreview as string}
                alt="Banner Preview"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  objectFit: "contain",
                  mt: 1,
                }}
              />
            )}
            {errors.banner && (
              <FormHelperText error>{errors.banner}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          fullWidth
          onClick={handleSubmit}
        >
          Create Event
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateEventModal;