import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Drawer } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoteIcon from '@mui/icons-material/Note';

const CompletedProblems = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [openNote, setOpenNote] = useState(null);
  const [noteContent, setNoteContent] = useState('');

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, notes: '' }]);
      setTaskInput('');
    }
  };

  const handleOpenNote = (index) => {
    setOpenNote(index);
    setNoteContent(tasks[index].notes);
  };

  const handleSaveNote = () => {
    setTasks(tasks.map((task, index) =>
      index === openNote ? { ...task, notes: noteContent } : task
    ));
    setOpenNote(null);
    setNoteContent('');
  };

  return (
    <Container sx={{ my: 3 }}>
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" gutterBottom sx={{my:3, color: '#f0f0f0' }}>
          Solved Problems
        </Typography>
        <Box
          sx={{
            maxHeight: '40px',
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            backgroundColor: '#333',
            padding: 2,
            borderRadius: 8,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          <TextField
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new problem"
            variant="standard"
            fullWidth
            sx={{ mr: 1, maxHeight:'60' }}
          />
          <Button variant="contained" color="primary" onClick={handleAddTask}>
            <AddCircleIcon />
          </Button>
        </Box>
        <Box
          sx={{
            maxHeight: '60vh',
            my: '3',
            overflowY: 'auto',
            backgroundColor: '#333',
            borderRadius: 8,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          <List sx={{my:3}}>
            {tasks.map((task, index) => (
              <ListItem key={index} sx={{ backgroundColor: '#444', mb: 1, borderRadius: 4 }}>
                <ListItemText primary={task.text} />
                <IconButton edge="end" onClick={() => handleOpenNote(index)} sx={{ color: '#76c7c0' }}>
                  <NoteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={openNote !== null}
        onClose={() => setOpenNote(null)}
      >
        <Box
          sx={{
            width: 300,
            padding: 2,
            backgroundColor: '#333',
            color: '#f0f0f0',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Notes
          </Typography>
          <TextField
            multiline
            rows={6}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSaveNote}>
            Save
          </Button>
        </Box>
      </Drawer>
    </Container>
  );
};

export default CompletedProblems;
