// src/components/UserInfo.js
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  const [editMode, setEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ ...userInfo });

  const handleEditToggle = () => {
    if (editMode) {
      // Save changes
      setUserInfo(editedInfo);
    }
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({
      ...editedInfo,
      [name]: value,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" align="center" gutterBottom>
          User Information
        </Typography>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <AccountCircleIcon />
          </Grid>
          <Grid item xs>
            <TextField
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              value={editMode ? editedInfo.name : userInfo.name}
              onChange={handleChange}
              disabled={!editMode}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item>
              <EmailIcon />
            </Grid>
            <Grid item xs>
              <TextField
                label="Email"
                name="email"
                fullWidth
                variant="outlined"
                value={editMode ? editedInfo.email : userInfo.email}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<EditIcon />}
            onClick={handleEditToggle}
          >
            {editMode ? "Save Changes" : "Edit Info"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserInfo;
