import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormHelperText,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { eventValidation } from "../../utils/validation";
import { showToastError, showToastSuccess } from "../common/utilies/toast";
import { createEvent } from "../../API/event"; // Add your updateEvent API function here

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

interface EventEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventData?: any;
  onUpdated: () => void; // Callback function to trigger refetch in parent component
}


const EventEditModal: React.FC<EventEditModalProps> = ({
  isOpen,
  onClose,
  eventData,
  onUpdated
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | ArrayBuffer>("");
  const [accessLink, setAccessLink] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("USD");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (eventData) {
      setTitle(eventData.title || "");
      setDescription(eventData.description || "");
      setDate(eventData.date || "");
      setTime(eventData.time || "");
      setDuration(eventData.duration || "");
      setSpeaker(eventData.speaker || "");
      setCategory(eventData.category || "");
      setPrice(eventData.price || 0);
      setCurrency(eventData.currency || "USD");
      if (eventData.bannerImageUrl) {
        setBannerPreview(eventData.bannerImageUrl);
      }
    }
  }, [eventData]);

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

  const handleSubmit = async () => {
    const validationErrors = eventValidation(
      title,
      description,
      date,
      time,
      duration,
      speaker,
      bannerFile,
      price,
      currency
    );

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append("eventId", eventData._id);
      formData.append("title", title || "");
      formData.append("description", description || "");
      formData.append("date", date || "");
      formData.append("time", time || "");
      formData.append("duration", duration.toString() || "");
      formData.append("speaker", speaker || "");
      formData.append("category", category || "");
      formData.append("price", price.toString() || "");
      formData.append("currency", currency || "");
      if (bannerFile) {
        formData.append("bannerFile", eventData.bannerImageUrl || bannerFile);
      }
      setLoading(true);
      try {
        // Call the API to create or update the event
        const result = await createEvent(formData);
        if (result.success) {
          showToastSuccess(result.message);
          onUpdated()
        } else {
          showToastError(result.message);
        }
        onClose()
      } catch (error) {
        showToastError("An error occurred while saving the event.");
      }
      setLoading(false);
      onClose();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        {/* Optional: Add loading spinner */}
        <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
          {eventData ? "Edit Event" : "Create a New Event"}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Form Fields */}
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
          disabled={loading}
        >
          {eventData ? "Update Event" : "Create Event"}
        </Button>
      </Box>
    </Modal>
  );
};

export default EventEditModal;
