import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { verifityRequesting } from "../../../API/user";
import useGetUser from "../../../hook/getUser";
import { showToastSuccess } from "../../common/utilies/toast";
import { BarLoader } from "react-spinners";

// Styles for the modal
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

export interface verifyRequest {
  fullName: string;
  profession: string;
  company?: string;
  website?: string;
  proofLink: string;
}

// Custom Paper component for form fields
const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProfessionalAccountModal: React.FC = () => {
  const loggedInUser = useGetUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFirstModalOpen, setFirstModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<verifyRequest>({
    fullName: loggedInUser.name || "",
    profession: "",
    company: "",
    website: "",
    proofLink: "",
  });

  const handleOpen = () => {
    setIsOpen(true);
    setFirstModalOpen(!isFirstModalOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
    setFirstModalOpen(!isFirstModalOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFirstModalOpen(!isFirstModalOpen);
    // Implement form submission logic here
    console.log("Form Data Submitted: ", formData);
    const result = await verifityRequesting(formData);
    if (result.success) {
      setLoading(false);
      showToastSuccess("Verification request submitted successfully.");
    }
    setLoading(false);
    // Optionally close the modal after submission
    handleClose();
  };

  React.useEffect(() => {
    setFirstModalOpen(!isFirstModalOpen);
  }, []);

  const handleCloseFirstModal = () => setFirstModalOpen(!isFirstModalOpen);

  return (
    <div>
      <Modal
        open={isFirstModalOpen}
        onClose={handleCloseFirstModal}
        aria-labelledby="first-modal-title"
        aria-describedby="first-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="first-modal-title"
            sx={{
              mt: 2,
              fontFamily: "poppins",
              fontWeight: "bold",
              fontSize: 30,
            }}
          >
            Verify Your Professional Account
          </Typography>
          <Typography
            id="first-modal-description"
            sx={{ mt: 2, fontFamily: "poppins" }}
          >
            To request a professional account verification, please confirm that
            you wish to proceed.
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleOpen} color="primary">
              Proceed
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
              <BarLoader color="black" />
            </div>
          )}
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
              color: "#333",
              letterSpacing: "0.5px",
            }}
          >
            Professional Account Verification
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomPaper>
                  <TextField
                    required
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    fullWidth
                  />
                </CustomPaper>
              </Grid>
              <Grid item xs={6}>
                <CustomPaper>
                  <TextField
                    required
                    label="Profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    fullWidth
                  />
                </CustomPaper>
              </Grid>
              <Grid item xs={6}>
                <CustomPaper>
                  <TextField
                    label="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    fullWidth
                  />
                </CustomPaper>
              </Grid>
              <Grid item xs={12}>
                <CustomPaper>
                  <TextField
                    label="Company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    fullWidth
                  />
                </CustomPaper>
              </Grid>

              <Grid item xs={12}>
                <CustomPaper>
                  <TextField
                    label="Proof Link"
                    name="proofLink"
                    value={formData.proofLink}
                    onChange={handleChange}
                    fullWidth
                  />
                </CustomPaper>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" type="submit" color="primary">
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfessionalAccountModal;
