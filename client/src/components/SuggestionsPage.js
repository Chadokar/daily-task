import React, { useState } from 'react';
import { Container, Grid, List, ListItem, Typography, Checkbox, ListItemIcon, ListItemText, Box, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const tasks = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: false },
  { id: 3, text: 'Task 3', completed: false },
];

const TaskPage = () => {
  const [taskList, setTaskList] = useState(tasks);

  const handleToggleComplete = (taskId) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasks = taskList.filter((task) => task.completed);
  const suggestedTasks = taskList.filter((task) => !task.completed);

  const progressPercentage = (completedTasks.length / tasks.length) * 100;

  return (
    <Container sx={{my:3}}>
      <Typography variant="h4" gutterBottom sx={{my:3, color: '#f0f0f0' }}>
        Suggested Problems
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            position: 'relative',
            height: 40,
            width: '100%',
            backgroundColor: '#444',
            borderRadius: 12,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
            overflow: 'hidden',
            padding: '2px',
          }}
        >
          <Box
            sx={{
              width: `${progressPercentage}%`,
              height: '100%',
              backgroundColor: '#39ff14', // Neon green
              borderRadius: 12,
              transition: 'width 0.3s ease-in-out'
            }}
          />
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#f0f0f0',
            }}
          >
            {completedTasks.length} / {tasks.length} Completed
          </Typography>
        </Box>
      </Box>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              padding: 3,
              borderRadius: 8,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              backgroundColor: '#333',
              color: '#f0f0f0'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Suggested Tasks
            </Typography>
            {suggestedTasks.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <SentimentSatisfiedAltIcon sx={{ fontSize: 60, color: '#76c7c0' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  All done! 🎉
                </Typography>
              </Box>
            ) : (
              <List>
                {suggestedTasks.map((task) => (
                  <ListItem key={task.id} button onClick={() => handleToggleComplete(task.id)} sx={{ backgroundColor: '#444', mb: 1, borderRadius: 4 }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={task.completed}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': `task-${task.id}` }}
                      />
                    </ListItemIcon>
                    <ListItemText id={`task-${task.id}`} primary={task.text} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              padding: 3,
              borderRadius: 8,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              backgroundColor: '#333',
              color: '#f0f0f0'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Completed Tasks
            </Typography>
            {completedTasks.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60, color: '#f44336' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Start achieving your goals!
                </Typography>
              </Box>
            ) : (
              <List>
                {completedTasks.map((task) => (
                  <ListItem key={task.id} sx={{ backgroundColor: '#444', mb: 1, borderRadius: 4 }}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={task.text} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TaskPage;
