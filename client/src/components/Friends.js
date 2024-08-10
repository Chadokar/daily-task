import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Divider,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  axiosDelete,
  axiosGet,
  axiosPostRequest,
} from "../redux/services/queryCalls";
import createToast from "../redux/services/createToast";

const FriendRequests = () => {
  const { data: receivedRequestsData } = useQuery({
    queryKey: ["receivedRequests"],
    queryFn: () => axiosGet("/friend/requests"),
  });

  const { data: sentRequestsData } = useQuery({
    queryKey: ["sentRequests"],
    queryFn: () => axiosGet("/friend/sent-requests"),
  });

  console.log("receivedRequestsData: ", receivedRequestsData);
  console.log("sentRequestsData: ", sentRequestsData);
  const queryClient = useQueryClient();

  const handleAccept = async (username) => {
    // Handle accept logic here
    await axiosPostRequest("/friend/accept", {}, { username }).then((res) => {
      createToast("Friend request accepted", "success");
      // call the query funtion using the key to refetch the data
      queryClient.invalidateQueries({ queryKey: ["receivedRequests"] });
    });
  };

  const handleReject = async (username) => {
    // Handle reject logic here
    await axiosDelete(`/friend/delete/${username}`)
      .then((res) => {
        createToast("Friend request rejected", "success");
        queryClient.invalidateQueries({ queryKey: ["sentRequests"] });
      })
      .catch((error) => {
        createToast("Error rejecting request", "error");
      });
  };

  return (
    <Box sx={{ width: "60vw", m: 5 }}>
      {/* Received Friend Requests */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Friend Requests Received</Typography>
          <List>
            {receivedRequestsData &&
            Array.isArray(receivedRequestsData.friends) ? (
              receivedRequestsData?.friends?.map((request, index) => (
                <React.Fragment key={request.id}>
                  <ListItem>
                    <ListItemText
                      primary={request.name}
                      secondary={`@${request.username}`}
                    />
                    <ListItemSecondaryAction sx={{ display: "flex", gap: 2 }}>
                      <IconButton
                        edge="end"
                        color="success"
                        onClick={() => handleAccept(request.user)}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => handleReject(request.user)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {receivedRequestsData &&
                    Array.isArray(receivedRequestsData.friends) &&
                    index < receivedRequestsData.friends.length - 1 && (
                      <Divider />
                    )}
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No friend requests received.
              </Typography>
            )}
          </List>
        </CardContent>
      </Card>

      {/* Sent Friend Requests */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">Friend Requests Sent</Typography>
          <List>
            {sentRequestsData && Array.isArray(sentRequestsData.friends) ? (
              sentRequestsData?.friends?.map((request, index) => (
                <React.Fragment key={request.id}>
                  <ListItem>
                    <ListItemText
                      primary={request.name}
                      secondary={`@${request.username}`}
                    />
                    <ListItemSecondaryAction>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleReject(request.user)}
                      >
                        Cancel Request
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {sentRequestsData &&
                    Array.isArray(sentRequestsData.friends) &&
                    index < sentRequestsData.friends.length - 1 && <Divider />}
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No friend requests sent.
              </Typography>
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FriendRequests;
