import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IuserSkillCardProps } from "../../page/user/Home";
import noProfile from "../../assets/nonProfile.jpg";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const OutlinedCard: React.FC<IuserSkillCardProps> = ({ users }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const navigate = useNavigate()

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const displayedUsers = users.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );


  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: 2,
          p: 2,
          overflowX: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {displayedUsers.map((user) => (
          <Card
            key={user.id}
            className="mt-32"
            variant="outlined"
            sx={{
              width: { xs: "100%", sm: 190 },
              borderColor: "black",
              borderRadius: "16px",
              boxShadow: 3,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.01)",
                boxShadow: 6,
              },
              flex: "0 0 auto",
            }}
          >
            <CardContent sx={{ padding: "0" }}>
              {user?.imageUrl ? (
                <img
                  src={user?.imageUrl}
                  alt=""
                  className="w-full h-6 md:h-20 md:w-full object-cover rounded-t-md"
                />
              ) : (
                <img
                  src={noProfile}
                  alt=""
                  className="w-full h-6 md:h-20 md:w-full object-cover rounded-t-md"
                />
              )}
              <Typography
                variant="h5"
                component="div"
                sx={{ mb: 1 }}
              ></Typography>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                <h2 className="ms-2 font-semibold">{user.name}</h2>
              </Typography>
              <Typography variant="body2">
                <b className="ms-2">
                  Skill : <span>{user.skill}</span>
                </b>
                <br />
                <b className="ms-2">
                  Country : <span>{user.country}</span>
                </b>
                <br />
              </Typography>
            </CardContent>
            <CardActions
              sx={{ justifyContent: "flex-end", padding: "16px", font: "bold" }}
            >
              <Button
                size="small"
                color="primary"
                onClick={()=>navigate(`/auth/OtherProfileView/${user._id}`,{ state : { profileImageUrl : user?.imageUrl , coverImageurl : user?.coverImageUrl}})}
              >
                View profile
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "absolute",
            top: "65%",
            left: 160,
            right: 160,
            transform: "translateY(-50%)",
            px: 2,
          }}
        >
          <button onClick={handlePrevPage} disabled={currentPage === 0}>
            <IoMdArrowDropleft size={32} />
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            <IoMdArrowDropright size={32} />
          </button>
        </Box>
      )}
    </Box>
  );
};

export default OutlinedCard;
