import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IuserSkillCardProps } from "../user/UsersRelatedSkill";
import noProfile from "../../assets/nonProfile.jpg";
import { useNavigate } from "react-router-dom";

const OutlinedCard: React.FC<IuserSkillCardProps> = ({ users }: any) => {
  const navigate = useNavigate();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const pageWidth = scrollRef.current.clientWidth;
      const currentPage = Math.round(scrollPosition / pageWidth);
      // Update current page or any other logic based on scroll position
    }
  };

  React.useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Box sx={{ position: "relative", width: "100%", mt: 2, cursor: "pointer" }} >
      <Box 
        ref={scrollRef}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: { xs: 1, sm: 2 },
          p: { xs: 1, sm: 2 },
          pl: { xs: 49, sm: 9 },
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "none", // For Firefox
          "&::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, and Opera
          },
          scrollBehavior: "smooth", // Ensures smooth scrolling
        }}
      >
        {users.map((user: any) => (
          <Card
            key={user._id}
            variant="outlined"
            sx={{
              width: { xs: 150, sm: 180 },
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
            onClick={() =>
              navigate(`/auth/OtherProfileView/${user._id}`, {
                state: {
                  profileImageUrl: user?.imageUrl,
                  coverImageurl: user?.coverImageUrl,
                },
              })
            }
          >
            <CardContent sx={{ padding: "0" }}>
              <img
                src={user?.imageUrl || noProfile}
                alt=""
                className="w-full h-32 object-cover rounded-t-md"
              />
              <Typography sx={{ mb: 1, p: 1 }} color="text.secondary">
                <span className="font-semibold">{user.name}</span>
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
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default OutlinedCard;
