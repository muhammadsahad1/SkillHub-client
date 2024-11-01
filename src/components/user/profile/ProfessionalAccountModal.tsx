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
import { setIsRequest } from "../../../redux/userSlices";
import { useDispatch } from "react-redux";

// Styles for the modal
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "600px", md: "700px" },
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
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFirstModalOpen, setFirstModalOpen] = useState<boolean>(false);
  const [isRquestedModalOpen, setRequestedModal] = useState<boolean>(false);
  const [isProfessionalModal, setProfessionalModal] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<verifyRequest>({
    fullName: loggedInUser.name || "",
    profession: "",
    company: "",
    website: "",
    proofLink: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    profession: "",
    proofLink: "",
  });

  const validate = () => {
    let tempErrors = { fullName: "", profession: "", proofLink: "" };
    let isValid = true;

    if (!formData.fullName) {
      tempErrors.fullName = "Full Name is required.";
      isValid = false;
    }

    if (!formData.profession) {
      tempErrors.profession = "Profession is required.";
      isValid = false;
    }

    if (!formData.proofLink) {
      tempErrors.proofLink = "Proof Link is required.";
      isValid = false;
    } else if (!/^https?:\/\/.+\..+/.test(formData.proofLink)) {
      tempErrors.proofLink = "Enter a valid URL.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleOpen = () => {
    if (loggedInUser?.isRequested) {
      setRequestedModal(true);
      setFirstModalOpen(false);
    } else {
      setIsOpen(true);
      setFirstModalOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setFirstModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,  
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setFirstModalOpen(false);
    // Implement form submission logic here
    const result = await verifityRequesting(formData);

    if (result.success) {
      dispatch(setIsRequest(true));
      showToastSuccess("Verification request submitted successfully.");
      setFormData({
        fullName: "",
        profession: "",
        company: "",
        website: "",
        proofLink: "",
      });
    }
    setLoading(false);
    handleClose();
  };

  React.useEffect(() => {
    if (loggedInUser?.isProfessional) {
      setProfessionalModal(true);
    } else {
      setFirstModalOpen(true);
    }
  }, []);

  const handleCloseFirstModal = () => setFirstModalOpen(false);
  const handleCloseRequestedModal = () => setRequestedModal(false);
  const handleCloseIsProfessionalModal = () => setProfessionalModal(false);

  return (
    <div>
      {/* Modal for already professional account */}
      <Modal
        open={isProfessionalModal}
        onClose={handleCloseIsProfessionalModal}
        aria-labelledby="professional-account-modal-title"
        aria-describedby="professional-account-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="professional-account-modal-title"
            sx={{
              mt: 2,
              fontFamily: "Poppins",
              fontWeight: "bold",
              fontSize: 30,
            }}
          >
            Already a Professional
          </Typography>
          <Typography
            id="professional-account-modal-description"
            sx={{ mt: 2, fontFamily: "Poppins" }}
          >
            Your account has already been upgraded to a professional status. You
            have access to all the features available to professionals.
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleCloseIsProfessionalModal}
              color="primary"
            >
              Ok
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for already requested verification */}
      <Modal
        open={isRquestedModalOpen}
        onClose={handleCloseRequestedModal}
        aria-labelledby="already-requested-modal-title"
        aria-describedby="already-requested-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="already-requested-modal-title"
            sx={{
              mt: 2,
              fontFamily: "Poppins",
              fontWeight: "bold",
              fontSize: 30,
            }}
          >
            Request Already Submitted
          </Typography>
          <Typography
            id="already-requested-modal-description"
            sx={{ mt: 2, fontFamily: "Poppins" }}
          >
            You have already requested professional account verification. Please
            wait for the review process to complete. We will notify you once
            your account has been verified.
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleCloseRequestedModal}
              color="primary"
            >
              Ok
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for starting the verification process */}
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
              fontFamily: "Poppins",
              fontWeight: "bold",
              fontSize: 30,
            }}
          >
            Verify Your Professional Account
          </Typography>
          <Typography
            id="first-modal-description"
            sx={{ mt: 2, fontFamily: "Poppins" }}
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

      {/* Form for requesting professional account verification */}
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
                    error={!!errors.fullName}
                    helperText={errors.fullName}
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
                    error={!!errors.profession}
                    helperText={errors.profession}
                  />
                </CustomPaper>
              </Grid>
              <Grid item xs={6}>
                <CustomPaper>
                  <TextField
                    label="Company (Optional)"
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
                    label="Website (Optional)"
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
                    required
                    label="Proof Link"
                    name="proofLink"
                    value={formData.proofLink}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.proofLink}
                    helperText={errors.proofLink}
                  />
                </CustomPaper>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
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
