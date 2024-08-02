import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IuserSkillCardProps } from "../user/UsersRelatedSkill";
import noProfile from "../../assets/nonProfile.jpg";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

const OutlinedCard: React.FC<IuserSkillCardProps> = ({ users }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const navigate = useNavigate();

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
    <Box sx={{ position: "relative", width: "100%", mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: { xs: 1, sm: 2 },
          p: { xs: 1, sm: 2 },
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {displayedUsers.map((user) => (
          <Card
            key={user.id}
            variant="outlined"
            sx={{
              width: { xs: 150, sm: 190 },
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
              <img
                src={user?.imageUrl || noProfile}
                alt=""
                className="w-full h-20 object-cover rounded-t-md"
              />
              <Typography sx={{ mb: 1, p: 1 }} color="text.secondary">
                <h2 className="font-semibold">{user.name}</h2>
              </Typography>
              <Typography variant="body2" sx={{ p: 1 }}>
                <b>
                  Skill: <span>{user.skill}</span>
                </b>
                <br />
                <b>
                  Country: <span>{user.country}</span>
                </b>
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end", p: 1 }}>
              <Button
                size="small"
                color="primary"
                onClick={() =>
                  navigate(`/auth/OtherProfileView/${user._id}`, {
                    state: {
                      profileImageUrl: user?.imageUrl,
                      coverImageurl: user?.coverImageUrl,
                    },
                  })
                }
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
            top: "50%",
            left: 0,
            right: 0,
            transform: "translateY(-50%)",
            px: 2,
          }}
        >
          <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
            <IoMdArrowDropleft size={32} />
          </IconButton>
          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            <IoMdArrowDropright size={32} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default OutlinedCard;
