import { useRef } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PalestineFlagIcon from "../ui/PalestineFlagIcon";
import { useUser } from "./../features/users/useUser";
import { roleNames } from '../Enums/roles';
import VisuallyHiddenInput from '../ui/VisuallyHiddenInput'
import { useForm } from 'react-hook-form';
import { useUpdateUser } from '../features/users/useUpdateUser';
import { useDialogs } from '@toolpad/core';
import { levelNames } from '../Enums/educationLevels';
import SpinnerLoader from '../ui/SpinnerLoader';
import { AddAPhoto, NewReleases } from '@mui/icons-material';
function Account() {
  const { user, isLoading: fetchingUser } = useUser();
  const { updateUser, isLoading: updatingUser } = useUpdateUser()
  const { register, handleSubmit, watch } = useForm();

  const profileBtn = useRef(null)
  const selected = watch('profilePicture')

  const dialogs = useDialogs();

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

  const updateProfile = async (data) => {
    if (!data.profilePicture.length) {
      profileBtn?.current.click()
      return;
    }


    const confirmed = await dialogs.confirm('Are you sure you want to update profile picture?', {
      title: 'Update profile picture ✅',
      okText: 'Yes',
      cancelText: 'No',
    })

    if (confirmed)
      updateUser(data.profilePicture[0], 'profile')
  }

  if (updatingUser || fetchingUser)
    return <SpinnerLoader />

  return (
    <Grid container flexDirection={'column'} spacing={2}
      sx={{
        flex: 1,
        bgcolor: "#fafafad2",
        padding: 2
      }}
    >
      <Grid container flexDirection={{ xs: 'column', sm: 'row' }} justifyContent={"space-between"} alignItems={'center'} spacing={2}>
        <Grid container flexDirection={'column'} size={{ xs: 12, sm: 8, lg: 9.5 }} spacing={2.5}>
          <Grid container spacing={4} alignItems="center" >
            <Typography variant="h5" sx={{ color: "primary.main" }}>
              User Information:
            </Typography>

            <Grid container alignItems="center" spacing={2}>
              <Typography sx={{ color: "primary.main" }}>
                WorkId:
              </Typography>
              <TextField
                variant="outlined"
                value={user.workId}
                size="small"
                sx={sx}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
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
              size="small"
              sx={sx1}
            />
          </Grid>
          <Grid container>
            <TextField
              label="Birthdate"
              variant="outlined"
              value={user.birthDate}
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
            spacing={2}
            alignItems={"center"}
          >
            <Typography
              alignItems={"center"}
              sx={{ color: "primary.main" }}
            >
              Educational level
            </Typography>
            <TextField
              variant="outlined"
              value={levelNames[user.educationalLevel]}
              size="small"
              sx={eduS}
            />
          </Grid>
        </Grid>

        <Grid component="form"
          onSubmit={handleSubmit(updateProfile)}
          container
          direction={"column"}
          size={{ xs: 12, sm: 4, lg: 2.5 }}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
        >

          <Tooltip title="Select new picture" placement='top' style={{
            cursor: 'pointer'
          }}>
            <label>
              <Avatar
                sx={{ width: 100, height: 100 }}
                alt="user"
                src={user.profilePicture?.path}
              />
              <VisuallyHiddenInput
                type="file"
                accept='.png, .jpg'
                {...register('profilePicture')}
                ref={(e) => {
                  register("profilePicture").ref(e);
                  profileBtn.current = e;
                }}
              />
            </label>
          </Tooltip>


          <Button
            type='submit'
            size='small'
            variant={selected ? 'contained' : 'outlined'}
            endIcon={selected ? <NewReleases /> : <AddAPhoto />}
          >
            {selected ? 'Update ' : 'Change '}
            Picture
          </Button>
        </Grid>
      </Grid>
      <Divider />
      {
        // ___________________________________________
      }

      <Grid container flexDirection={'column'} alignItems={{ xs: 'center', sm: 'start' }} justifyContent={'space-between'} spacing={3} >
        <Typography variant="h5" sx={{ color: "primary.main" }}>
          Contact Information:
        </Typography>

        <Grid container flexDirection={'column'} gap={3}>
          <TextField
            label="Phone Number"
            variant="outlined"
            value={user.phoneNumber}
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

          <TextField
            label="Email Address"
            variant="outlined"
            value={user.email}
            size='medium'
            sx={{ ...sx1, width: "18rem" }}
          />
        </Grid>
      </Grid>

      <Divider />

      <Grid container flexDirection={'column'} alignItems={{ xs: 'center', sm: 'start' }} justifyContent={'space-between'} spacing={3}
      >
        <Typography variant="h5" sx={{ color: "primary.main" }}>
          Job Information:
        </Typography>
        <Grid container flexDirection={{ xs: 'column', sm: 'row' }} gap={3}>
          <TextField
            label="Department"
            variant="outlined"
            value={user.department.name}
            readOnly
            size="small"
            sx={{ ...sx1 }}
          />
          <TextField
            label="Major"
            variant="outlined"
            value={user.major.name}
            readOnly
            size="small"
            sx={{ ...sx1 }}
          />
          <TextField
            label="Role"
            variant="outlined"
            value={roleNames[user.role]}
            readOnly
            size="small"
            sx={{ ...sx1 }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Account;
