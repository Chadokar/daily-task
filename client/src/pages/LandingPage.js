import React from "react";
// import Calendar from "../components/Calendar";
import CalendarGrid from "../components/Calendar";
import Sidebar from "../components/Sidebar";
import Box from '@mui/material/Box';


const LandingPage = () => {
  // return <CalendarGrid/>;
  return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar/>
        <CalendarGrid/>
      </Box>
  )
};

export default LandingPage;
