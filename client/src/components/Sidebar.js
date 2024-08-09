import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, Paper, TextField, List, ListItem, ListItemText } from '@mui/material';

// Styled components
const SidebarContainer = styled('div')({
  width: '300px',
  height: '100vh',
  backgroundColor: '#212121',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  boxSizing: 'border-box',
});

const UserProfile = styled(Paper)({
  backgroundColor: '#333',
  color: 'white',
  padding: '24px',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
  boxShadow: 'none',
});

const UserImage = styled('img')({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  marginRight: '16px',
});

const UserName = styled(Typography)({
  flex: 1,
});

const SearchBox = styled('div')({
  marginBottom: '16px',
});

const FriendsList = styled('div')({
  flex: 1,
  overflowY: 'auto',
  marginBottom: '16px',
});

const FriendItem = styled(ListItem)({
  backgroundColor: '#333',
  borderBottom: '1px solid #444',
  '&:hover': {
    backgroundColor: '#444',
  },
});

const AddTaskCard = styled(Paper)({
  backgroundColor: '#333',
  color: 'white',
  padding: '16px',
  boxShadow: 'none',
});

const TaskInput = styled(TextField)({
  width: '100%',
  marginBottom: '16px',
  input: {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

const Sidebar = () => {
  const [task, setTask] = useState('');
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState([
    'Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Hannah', 'Ivy'
  ]);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleTaskSubmit = () => {
    // Handle task submission
    console.log('Task submitted:', task);
    setTask(''); // Clear the input after submission
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Handle search functionality
    console.log('Search for:', search);
  };

  return (
    <SidebarContainer>
      {/* User profile section */}
      <UserProfile elevation={0}>
        <UserImage src="https://via.placeholder.com/80" alt="User" />
        <Box flex={1}>
          <UserName variant="h6">Username</UserName>
          <TextField
            variant="outlined"
            placeholder="Find a user..."
            value={search}
            onChange={handleSearchChange}
            size="small"
            fullWidth
            style={{ marginBottom: '8px' }}
            InputProps={{
              endAdornment: (
                <Button variant="contained" color="primary" onClick={handleSearchSubmit}>
                  Search
                </Button>
              ),
            }}
          />
          <Button variant="outlined" color="primary">Show Friends</Button>
        </Box>
      </UserProfile>

      {/* Friends list section */}
      <FriendsList>
        <List>
          {friends.map((friend, index) => (
            <FriendItem key={index}>
              <ListItemText primary={friend} />
            </FriendItem>
          ))}
        </List>
      </FriendsList>

      {/* Task addition card */}
      <AddTaskCard elevation={0}>
        <Typography variant="h6" gutterBottom>
          Suggest problem 
        </Typography>
        <TaskInput
          variant="outlined"
          placeholder="Enter task here..."
          value={task}
          onChange={handleTaskChange}
        />
        <Button variant="contained" color="primary" onClick={handleTaskSubmit}>
          Submit
        </Button>
      </AddTaskCard>
    </SidebarContainer>
  );
};

export default Sidebar;
