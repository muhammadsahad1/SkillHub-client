import { Box } from '@mui/material'
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useGetUser from '../../../hook/getUser';
import { useNavigate } from 'react-router-dom';
import noProfile from "../../assets/nonProfile.jpg";


const HomeProfileBox = () => {

  const currentUser = useGetUser()
  const navigate = useNavigate()

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
            navigate(`/auth/viewProfile`, {
              state: {
                profileImageUrl: user?.imageUrl,
                coverImageurl: user?.coverImageUrl,
              },
            })
          }
        >
          <CardContent sx={{ padding: "0" }}>
            <img
              src={currentUser?.picture?.imageUrl || noProfile}
              alt=""
              className="w-full h-32 object-cover rounded-t-md"
            />
            <Typography sx={{ mb: 1, p: 1 }} color="text.secondary">
              <span className="font-semibold">{currentUser.name}</span>
            </Typography>
            <Typography variant="body2" sx={{ p: 1 }}>
              <b>
                Skill: <span>{currentUser.skill}</span>
              </b>
              <br />
              {/* <b>
               <span>{currentUser.country}</span>
              </b> */}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
}

export default HomeProfileBox
