import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fetchSearchUsers } from "../../API/user";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";

interface Option {
  _id: string;
  name: string;
  profileImageUrl?: string;
}

const SearchUsers = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fetch users function with loading state
  const fetchUser = async (query: string) => {
    setLoading(true);
    try {
      const result = await fetchSearchUsers(query);
      if (result.success) {
        setOptions(result.result);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search input handler
  const handleSearchInput = debounce((value: string) => {
    if (value) {
      fetchUser(value);
    } else {
      setOptions([]); 
    }
  }, 300);

  // Handle input change for autocomplete
  const handleInputChange = (
    _event: React.SyntheticEvent,
    value: string,
    _reason: AutocompleteInputChangeReason
  ) => {
    handleSearchInput(value);
  };

  // Navigate to user profile on selection
  const handleNavigation = (option: Option) => {
    navigate(`/auth/OtherProfileView/${option._id}`, {
      state: {
        profileImageUrl: option.profileImageUrl,
      },
    });
  };

  return (
    <Stack
      spacing={2}
      sx={{
        marginLeft: 4,
        border: 0,
        borderColor: "gray",
        borderRadius: 50,
        width: "250px",
        height: "45px",
        backgroundColor: "#fff",
      }}
    >
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        onInputChange={handleInputChange}
        loading={loading}
        disableClearable
        options={options}
        getOptionLabel={(option: any) => option.name}
        renderOption={(props, option: any) => {
          console.log("Option data:", option); // Debugging to ensure correct data
          return (
            <Box
              component="li"
              {...props}
              key={option._id}
              onClick={() => handleNavigation(option)}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  cursor: "pointer",
                },
              }}
            >
              {/* Avatar for user's profile image */}
              <Avatar
                src={option.profileImageUrl}
                alt={option.name}
                sx={{ width: 40, height: 40, marginRight: 2 }}
              />
              {/* User name display */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="subtitle1" component="div" color="text.primary">
                  {option.name}
                </Typography>
              </Box>
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search Users"
            InputProps={{
              ...params.InputProps,
              type: "search",
              sx: {
                width: "250px",
                height: "45px",
                border: 2,
                borderRadius: "50px",
                backgroundColor: "#f5f6f7",
                paddingLeft: "10px",
                "&:hover": {
                  backgroundColor: "#e4e6eb",
                },
              },
            }}
          />
        )}
      />
    </Stack>
  );
};

export default SearchUsers;
