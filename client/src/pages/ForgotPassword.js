// src/components/ForgotPassword.js
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleEmailSubmit = () => {
    // Add logic to send OTP to the entered email
    setShowOtpInput(true);
  };

  const handleOtpSubmit = () => {
    // Add logic to verify OTP and allow password reset
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <EmailIcon />
          </Grid>
          <Grid item xs>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={showOtpInput}
            />
          </Grid>
        </Grid>
        {showOtpInput && (
          <Box mt={2}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item>
                <VpnKeyIcon />
              </Grid>
              <Grid item xs>
                <TextField
                  label="OTP"
                  fullWidth
                  variant="outlined"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={showOtpInput ? <LockOpenIcon /> : <EmailIcon />}
            onClick={showOtpInput ? handleOtpSubmit : handleEmailSubmit}
          >
            {showOtpInput ? "Verify OTP" : "Send OTP"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
