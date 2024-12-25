import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { roleNames } from "../../Enums/roles";
import { levelNames } from "../../Enums/educationLevels";
import { genderNames } from "../../Enums/gender";

function ShowUserDetails({ payload, open, onClose }) {
  const user = payload.user;

  return (
    <Dialog fullWidth maxWidth={"md"} open={open} onClose={() => onClose()}>
      <Typography component={DialogTitle} variant="h4">
        User Details
      </Typography>
      <DialogContent sx={{ minHeight: "70dvh" }}>
        <Grid container flexDirection={"column"} spacing={3}>
          <Grid container>
            <TextField
              label="Work ID"
              focused
              margin="dense"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={user.workId}
            />
            <TextField
              label="Educational level"
              focused
              margin="dense"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={levelNames[user.educationalLevel]}
            />
          </Grid>
          <Grid container>
            <TextField
              label="First name"
              focused
              margin="dense"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={user.firstName}
            />
            <TextField
              label="Middle name"
              focused
              margin="dense"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={user.middleName}
            />
            <TextField
              label="Last name"
              focused
              margin="dense"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={user.lastName}
            />
          </Grid>
          <Grid container>
            <TextField
              label="Gender"
              focused
              margin="dense"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={genderNames[user.gender]}
            />
            <TextField
              label="Birthdate"
              focused
              margin="dense"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={user.birthDate}
            />
          </Grid>
          <Grid container>
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
              label="Emai address"
              focused
              margin="dense"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={user.email}
            />
          </Grid>
          <Grid container>
            <TextField
              label="Department"
              focused
              margin="dense"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={user.department?.name || '--'}
            />
            <TextField
              label="Major"
              focused
              margin="dense"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={user.major?.name || '--'}
            />
            <TextField
              label="Role"
              focused
              margin="dense"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={roleNames[user.role]}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: "0 15px 15px 0" }}>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ShowUserDetails;
