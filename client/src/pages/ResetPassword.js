// src/components/ResetPassword.js
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import createToast from "../redux/services/createToast";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      createToast("Passwords do not match!", "warning");
      return;
    }
    // Add logic to reset the password
    createToast("Password successfully reset!", "success");
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" align="center" gutterBottom>
          Reset Password
        </Typography>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <LockOpenIcon />
          </Grid>
          <Grid item xs>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item>
              <LockIcon />
            </Grid>
            <Grid item xs>
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<LockIcon />}
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
