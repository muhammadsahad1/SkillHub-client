import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
    <Box sx={{ width: "100%", mt: 2, overflow: "hidden" }}>
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto",
          gap: { xs: 1, sm: 2 },
          p: { xs: 1, sm: 2 },
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollBehavior: "smooth",
          "-webkit-overflow-scrolling": "touch",
        }}
      >
        {users.map((user: any) => (
          <Card
            key={user._id}
            variant="outlined"
            sx={{
              minWidth: { xs: 200, sm: 200, md: 200 },
              maxWidth: { xs: 200, sm: 200, md: 200 },
              borderColor: "black",
              borderRadius: "16px",
              cursor: "pointer",
              boxShadow: 3,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
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
            <CardContent sx={{ padding: 0 }}>
              <img
                src={user?.imageUrl || noProfile}
                alt=""
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              />
              <Box sx={{ p: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {user.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Skill:</strong> {user.skill}
                </Typography>
                <Typography variant="body2">
                  <strong>Country:</strong> {user.country}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default OutlinedCard;
