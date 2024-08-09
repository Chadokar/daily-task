import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { axiosGet, axiosPostRequest } from "../redux/services/queryCalls";
import { useQuery } from "@tanstack/react-query";
import createToast from "../redux/services/createToast";
import DialogSlide from "./Model";
import Friends from "./Friends";

// Styled components
const SidebarContainer = styled("div")({
  width: "300px",
  height: "100vh",
  backgroundColor: "#212121",
  color: "white",
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  boxSizing: "border-box",
});

const UserProfile = styled(Paper)({
  backgroundColor: "#333",
  color: "white",
  padding: "24px",
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
  boxShadow: "none",
});

const UserImage = styled("img")({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  marginRight: "16px",
});

const UserName = styled(Typography)({
  flex: 1,
});

const SearchBox = styled("div")({
  marginBottom: "16px",
});

const FriendsList = styled("div")({
  flex: 1,
  overflowY: "auto",
  marginBottom: "16px",
});

const FriendItem = styled(ListItem)({
  backgroundColor: "#333",
  borderBottom: "1px solid #444",
  "&:hover": {
    backgroundColor: "#444",
  },
});

const AddTaskCard = styled(Paper)({
  backgroundColor: "#333",
  color: "white",
  padding: "16px",
  boxShadow: "none",
});

const TaskInput = styled(TextField)({
  width: "100%",
  marginBottom: "16px",
  input: {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const Sidebar = () => {
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eva",
    "Frank",
    "Grace",
    "Hannah",
    "Ivy",
  ]);

  const user = JSON.parse(localStorage.getItem("user"));

  const { data: friendsData } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => await axiosGet("/friend/list"),
  });

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleSuggest = async () => {
    // Handle task submission
    await axiosPostRequest("problems/suggest", {}, { url: task })
      .then((res) => {
        createToast(
          res.data.message || "Task submitted successfully",
          "success"
        );
        setTask("");
      })
      .catch((error) => {
        const msg =
          error?.response &&
          error?.response?.data &&
          Array.isArray(error?.response?.data?.errors)
            ? error.response?.data?.errors[0]?.msg
            : null;
        createToast(
          error.response.data.error || msg || "Error submitting task",
          "error"
        );
      });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSendRequest = async () => {
    // Handle search functionality
    await axiosPostRequest("/friend/request", {}, { friend: search })
      .then((response) => {
        createToast(
          response.data.message || "Request sent successfully",
          "success"
        );
        setSearch("");
      })
      .catch((error) => {
        const msg =
          error?.response &&
          error?.response?.data &&
          Array.isArray(error?.response?.data?.errors)
            ? error.response?.data?.errors[0]?.msg
            : null;
        createToast(
          error.response.data.error || msg || "Error sending request",
          "error"
        );
      });
  };

  return (
    <SidebarContainer>
      {/* User profile section */}
      <UserProfile elevation={0}>
        <UserImage src="https://via.placeholder.com/80" alt="User" />
        <Box flex={1}>
          <UserName variant="h6">{user?.username}</UserName>
          <TextField
            variant="outlined"
            placeholder="Find a user..."
            value={search}
            onChange={handleSearchChange}
            size="small"
            fullWidth
            style={{ marginBottom: "8px" }}
          />
          <Button
            variant="outlined"
            onClick={handleSendRequest}
            color="primary"
          >
            SEnd
          </Button>
        </Box>
      </UserProfile>

      {/* Task addition card */}
      <AddTaskCard elevation={0}>
        <Typography variant="h6" gutterBottom>
          Suggest problem
        </Typography>
        <TaskInput
          variant="outlined"
          placeholder="Enter task here..."
          type="url"
          value={task}
          onChange={handleTaskChange}
        />
        <Button variant="contained" color="primary" onClick={handleSuggest}>
          Submit
        </Button>
      </AddTaskCard>

      {/* Friends dialog */}
      <DialogSlide
        button={<Button variant="outlined">Friends Requests</Button>}
      >
        <Friends />
      </DialogSlide>

      {/* Friends list section */}
      <FriendsList>
        <List>
          {friendsData &&
            friendsData?.friends?.map((friend, index) => (
              <FriendItem key={index}>
                <ListItemText primary={friend} />
              </FriendItem>
            ))}
        </List>
      </FriendsList>
    </SidebarContainer>
  );
};

export default Sidebar;
