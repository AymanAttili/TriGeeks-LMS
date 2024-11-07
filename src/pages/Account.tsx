import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PalestineFlagIcon from "../ui/PalestineFlagIcon";
import theme from "../utils/theme";
import { useUser } from "./../features/authentication/useUser";

function Account() {
  const { user } = useUser();

  const sx = {
    // styling text field
    width: "7.5rem",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main", // Outline color
      borderRadius: "8px",
    },
    "& .MuiInputLabel-root": {
      color: "primary.main", // Label color
    },
    "& .Mui-disabled": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main", // Outline color when disabled
      },
      "& .MuiInputLabel-root": {
        color: "primary.main", // Label color when disabled
      },
      "& .MuiInputBase-input": {
        color: "black", // Text color when disabled
      },
    },
  };
  const sx1 = {
    width: "14rem",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main", // Outline color
    },
    "& .MuiInputLabel-root": {
      color: "primary.main", // Label color
    },
    "& .Mui-disabled": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main", // Outline color when disabled
      },
      "& .MuiInputLabel-root": {
        color: "primary.main", // Label color when disabled
      },
      "& .MuiInputBase-input": {
        color: "black", // Text color when disabled
      },
    },
  };
  const eduS = {
    width: "7rem",
    "& input": {
      textAlign: "center", // Center text inside the input
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main", // Outline color
      borderRadius: "8px",
    },
    "& .MuiInputLabel-root": {
      color: "primary.main", // Label color
    },
    "& .Mui-disabled": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main", // Outline color when disabled
      },
      "& .MuiInputLabel-root": {
        color: "primary.main", // Label color when disabled
      },
      "& .MuiInputBase-input": {
        color: "black", // Text color when disabled
      },
    },
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: "#fafafad2",
      }}
    >
      <Grid>
        <Grid container justifyContent={"space-between"}>
          <Grid size={9}>
            <Grid container spacing={4} alignItems="center" margin={3}>
              <Grid item>
                <Typography variant="h5" sx={{ color: "primary.main" }}>
                  User Information:
                </Typography>
              </Grid>

              <Grid item>
                <Grid container alignItems="center" spacing={2}>
                  <Typography sx={{ color: "primary.main" }}>
                    WorkId:
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={user.workId}
                    readOnly
                    size="small"
                    sx={sx}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container sx={{ ml: 5 }} size={12} spacing={2}>
              <TextField
                label="First name"
                variant="outlined"
                value={user.firstName}
                readOnly
                size="small"
                sx={sx1}
              />
              <TextField
                label="Middle name"
                variant="outlined"
                value={user.middleName}
                readOnly
                size="small"
                sx={sx1}
              />
              <TextField
                label="Last name"
                variant="outlined"
                value={user.lastName}
                readOnly
                size="small"
                sx={sx1}
              />
            </Grid>
            <Grid sx={{ ml: 5, mt: 4 }}>
              <TextField
                label="Birthdate"
                variant="outlined"
                value={user.birthDate}
                readOnly
                size="small"
                sx={sx1}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">
                        <DateRangeIcon sx={{ color: "primary.main" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid
              container
              spacing={3}
              alignItems={"center"}
              sx={{ ml: 5, mt: 3, mb: 2 }}
            >
              <Grid item>
                <Typography
                  alignItems={"center"}
                  sx={{ color: "primary.main" }}
                >
                  Educational level
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  value={user.educationalLevel}
                  readOnly
                  size="small"
                  sx={eduS}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            sx={isSmallScreen && { width: "100%", mb: 2 }}
            alignItems={isSmallScreen ? "center" : ""}
            justifyContent={isSmallScreen ? "center" : ""}
          >
            <Grid
              container
              direction={"column"}
              size={2.5}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ mt: 4, mr: 2 }}
              spacing={2}
            >
              <Grid>
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  alt="user"
                  src="../logo.jpg"
                />
              </Grid>
              <Grid>
                <Button variant="contained">Update Picture</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ ml: 1 }} />
        {
          // ___________________________________________
        }

        <Grid sx={{ ml: 3, mt: 2 }}>
          <Grid item sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ color: "primary.main" }}>
              Contact Information:
            </Typography>
          </Grid>

          <Grid sx={{ ml: 2 }}>
            <Grid sx={{ mb: 3 }}>
              <TextField
                label="Phone Number"
                variant="outlined"
                value={user.phoneNumber}
                readOnly
                size="small"
                sx={sx1}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PalestineFlagIcon />
                        <span>+97</span>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid>
              <TextField
                label="Email Address"
                variant="outlined"
                value={user.email}
                readOnly
                size="large"
                sx={{ ...sx1, width: "18rem" }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ ml: 1, mt: 3 }} />

        <Grid>
          <Grid
            sx={{ ml: 3, mt: 2 }}
            container
            direction={"column"}
            spacing={3}
          >
            <Grid>
              <Typography variant="h5" sx={{ color: "primary.main" }}>
                Job Information:
              </Typography>
            </Grid>
            <Grid container spacing={3} sx={{ ml: 2 }}>
              <Grid>
                <TextField
                  label="Department"
                  variant="outlined"
                  value={user.department.name}
                  readOnly
                  size="small"
                  sx={{ ...sx1 }}
                />
              </Grid>
              <Grid>
                <TextField
                  label="Major"
                  variant="outlined"
                  value={user.major.name}
                  readOnly
                  size="small"
                  sx={{ ...sx1 }}
                />
              </Grid>
              <Grid>
                <TextField
                  label="Role"
                  variant="outlined"
                  value={user.role}
                  readOnly
                  size="small"
                  sx={{ ...sx1 }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Account;
