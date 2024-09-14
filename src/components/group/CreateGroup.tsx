import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { skillLists } from "../../needObject/skills";
import { createGroup } from "../../API/group";
import { showToastError, showToastSuccess } from "../common/utilies/toast";
import { UploadFile } from "@mui/icons-material";
import { BarLoader } from "react-spinners";
import { SelectChangeEvent } from '@mui/material/Select';


interface props {
  onCreated : () => void
}

const CreateGroup : React.FC<props> = ({onCreated}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [groupImageFile, setGroupImageFile] = useState<File | null>(null);
  const [groupImagePrev, setGroupImagePrev] = useState<string | ArrayBuffer>(
    ""
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setGroupImagePrev("");
    setSelectedSkills([]);
    setGroupImageFile(null);
    setDescription("");
  };

  const handleSkillChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedSkills(
      typeof value === "string" ? value.split(",") : value as string[]
    );
  };
  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!groupName) tempErrors.groupName = "Group Name is required.";
    if (selectedSkills.length === 0)
      tempErrors.skills = "At least one skill is required.";
    if (!description) tempErrors.description = "Description is required.";
    if (groupImageFile) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      // Check file type
      if (!allowedTypes.includes(groupImageFile.type)) {
        tempErrors.groupImageFile =
          "Image must be in JPEG, PNG, or GIF format.";
      }

      // Check file size
      if (groupImageFile.size > maxSize) {
        tempErrors.groupImageFile = "Image size must be less than 5MB.";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const formData = new FormData();
      formData.append("groupName", groupName);
      formData.append("selectedSkills", JSON.stringify(selectedSkills));
      formData.append("description", description);
      if (groupImageFile) {
        formData.append("groupImageFile", groupImageFile);
      }
      setLoading(true);
      const result = await createGroup(formData);
      if (result.success) {
      onCreated()
        showToastSuccess("Created group successfully");
      } else {
        showToastError("Falied to create group");
      }
      setLoading(false);
      handleClose();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setGroupImagePrev(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setGroupImageFile(file);
    }
  };

  return (
    <div>
      <button
        className="shadow-md text-sm w-26 px-6 py-2 font-poppins bg-zinc-900 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 tracking-wider"
        onClick={handleOpen}
      >
        Create Group
      </button>

      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={style}>
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
            <BarLoader color="black" />
          </div>
        )}
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", fontFamily: "poppins" }}
          >
            Create a New Group
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                error={!!errors.groupName}
                helperText={errors.groupName}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.skills}>
                <InputLabel id="skills-label">Select Skills</InputLabel>
                <Select
                  labelId="skills-label"
                  multiple
                  value={selectedSkills}
                  onChange={handleSkillChange}
                  input={<OutlinedInput label="Select Skills" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {skillLists.map((skill) => (
                    <MenuItem key={skill} value={skill}>
                      <Checkbox checked={selectedSkills.indexOf(skill) > -1} />
                      <ListItemText primary={skill} />
                    </MenuItem>
                  ))}
                </Select>
                {errors.skills && (
                  <FormHelperText error>{errors.skills}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadFile />}
                fullWidth
                sx={{ mb: 2 }}
              >
                Upload Group Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {groupImagePrev && (
                <Box
                  component="img"
                  src={groupImagePrev as string}
                  alt="groupImage Preview"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 2,
                    objectFit: "obj",
                    mt: 1,
                  }}
                />
              )}
              {errors.groupImageFile && (
                <FormHelperText error>{errors.groupImageFile}</FormHelperText>
              )}
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
          </Grid>
          <Button
            variant="contained"
            sx={{ mt: 3, fontFamily: "poppins" }}
            fullWidth
            onClick={handleSubmit}
          >
            Create Group
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateGroup;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
  maxWidth: 600,
  maxHeight: '90vh',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflowY: 'auto',
};
