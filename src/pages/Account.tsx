import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Grid2 as Grid,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useUser } from "./../features/users/useUser";
import { roleNames } from "../Enums/roles";
import VisuallyHiddenInput from "../ui/VisuallyHiddenInput";
import { useForm } from "react-hook-form";
import { useDialogs } from "@toolpad/core";
import { levelNames } from "../Enums/educationLevels";
import { AddAPhoto, Lock, NewReleases } from "@mui/icons-material";
import { useDispatchUsers } from "../features/users/useDispatchUsers";
import { MuiTelInput } from "mui-tel-input";
import ChangePasswordDialog from "../features/users/ChangePasswordDialog";
import LoadingButton from "@mui/lab/LoadingButton";
function Account() {
  const { user, isLoading: fetchingUser } = useUser();
  const { usersDispatch, isLoading: updatingUser } = useDispatchUsers();
  const { register, handleSubmit, watch, reset } = useForm();

  const [currImage, setCurrImage] = useState(user?.profilePicture?.path);

  const profileBtn = useRef(null);
  const selected = watch("profilePicture")?.length > 0;

  const dialogs = useDialogs();

  const sx = {
    // styling text field

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

  const isValidFile = (profilePicture) => {
    const allowedExtensions = ["jpg", "png", "jpeg"];
    const fileExtension = profilePicture[0]?.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension)
  }

  useEffect(() => {
    const handleFileChange = (files) => {
      const file = files[0]; // Get the selected file
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setCurrImage(reader.result); // Set the preview URL
        };
        reader.readAsDataURL(file); // Read file as Data URL
      }
    };

    handleFileChange(watch('profilePicture'))
  }, [watch('profilePicture')])


  const updateProfile = async (data) => {

    if (!data.profilePicture.length) {
      profileBtn?.current.click();
      return;
    }
    if (!isValidFile(data.profilePicture)) {
      await dialogs.alert('Please upload a valid profile picture. (.jpg, .jpeg, .png)')
      reset();
      return;
    }

    const confirmed = await dialogs.confirm(
      "Are you sure you want to update profile picture?",
      {
        title: "Update profile picture ✅",
        okText: "Yes",
        cancelText: "No",
      }
    );

    if (confirmed) {
      await usersDispatch({
        action: "editProfilePic",
        payload: { file: data.profilePicture[0] },
      });
    }
  };

  const openChengePasswordDialog = async () => {
    await dialogs.open(ChangePasswordDialog);
  }

  return (
    <Grid
      component={Paper}
      container
      flexDirection={"column"}
      spacing={2}
      sx={{
        flex: 1,
        padding: 2,
      }}
    >
      <Grid
        container
        flexDirection={{ xs: "column-reverse", sm: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}
      >
        <Grid
          container
          flexDirection={"column"}
          size={{ xs: 12, sm: 8, lg: 9.5 }}
          spacing={2}
        >
          <Grid container spacing={4} alignItems="center">
            <Typography variant="h5" sx={{ color: "primary.main" }}>
              User Information:
            </Typography>

            <Grid container alignItems="center" spacing={2}>
              <Typography sx={{ color: "primary.main" }}>WorkId:</Typography>
              <TextField
                variant="outlined"
                value={user.workId}
                size="small"
                sx={sx}
                focused
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <TextField
              label="First name"
              variant="outlined"
              value={user.firstName}
              focused
              size="small"
              sx={sx1}
            />
            <TextField
              label="Middle name"
              variant="outlined"
              value={user.middleName}
              focused
              size="small"
              sx={sx1}
            />
            <TextField
              label="Last name"
              variant="outlined"
              value={user.lastName}
              size="small"
              sx={sx1}
              focused
            />
          </Grid>
          <Grid container>
            <TextField
              label="Birthdate"
              variant="outlined"
              value={user.birthDate}
              size="small"
              sx={sx1}
              focused
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
          <Grid container spacing={2} alignItems={"center"}>
            <Typography alignItems={"center"} sx={{ color: "primary.main" }}>
              Educational level
            </Typography>
            <TextField
              variant="outlined"
              value={levelNames[user.educationalLevel]}
              size="small"
              sx={eduS}
              focused
            />
          </Grid>
        </Grid>

        <Grid
          component="form"
          onSubmit={handleSubmit(updateProfile)}
          container
          direction={"column"}
          size={{ xs: 12, sm: 4, lg: 2.5 }}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
        >
          <Tooltip
            title="Select new picture"
            placement="top"
            style={{
              cursor: "pointer",
            }}
          >
            <label>
              <Avatar
                sx={{ width: 100, height: 100 }}
                alt="user"
                src={currImage}
              />
              <VisuallyHiddenInput
                type="file"
                accept=".png, .jpg, .jpeg"
                {...register("profilePicture")}
                ref={(e) => {
                  register("profilePicture").ref(e);
                  profileBtn.current = e;
                }}
              />
            </label>
          </Tooltip>
          <LoadingButton
            type="submit"
            size="small"
            disabled={updatingUser}
            loading={updatingUser}
            variant={selected ? "contained" : "outlined"}
            endIcon={selected ? <NewReleases /> : <AddAPhoto />}
            loadingPosition="end"
          >
            {selected ? "Update " : "Change "}
            Picture
          </LoadingButton>
          <Button
            size="small"
            variant="contained"
            endIcon={<Lock />}
            onClick={openChengePasswordDialog}
          >
            Change password
          </Button>
        </Grid>
      </Grid>
      <Divider />
      {
        // ___________________________________________
      }

      <Grid
        container
        flexDirection={"column"}
        alignItems={{ xs: "center", sm: "start" }}
        justifyContent={"space-between"}
        spacing={3}
      >
        <Typography variant="h5" sx={{ color: "primary.main" }}>
          Contact Information:
        </Typography>

        <Grid container flexDirection={"column"} gap={3}>
          <MuiTelInput
            label="Phone number"
            margin="dense"
            focused
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            disableDropdown
            value={user.phoneNumber}
          />

          <TextField
            label="Email Address"
            variant="outlined"
            value={user.email}
            size="medium"
            focused
            sx={{ ...sx1, width: "20rem" }}
          />
        </Grid>
      </Grid>

      <Divider />

      <Grid
        container
        flexDirection={"column"}
        alignItems={{ xs: "center", sm: "start" }}
        justifyContent={"space-between"}
        spacing={3}
      >
        <Typography variant="h5" sx={{ color: "primary.main" }}>
          Job Information:
        </Typography>
        <Grid container flexDirection={{ xs: "column", sm: "row" }} gap={3}>
          <TextField
            label="Department"
            variant="outlined"
            value={user.department?.name || '---'}
            focused
            size="small"
            sx={{ ...sx1 }}
          />
          <TextField
            label="Major"
            variant="outlined"
            value={user.major?.name || '---'}
            focused
            size="small"
            sx={{ ...sx1 }}
          />
          <TextField
            label="Role"
            variant="outlined"
            value={roleNames[user.role]}
            focused
            size="small"
            sx={{ ...sx1 }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Account;
