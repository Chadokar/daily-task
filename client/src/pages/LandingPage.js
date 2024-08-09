import React from "react";
// import Calendar from "../components/Calendar";
import CalendarGrid from "../components/Calendar";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const LandingPage = () => {
  // return <CalendarGrid/>;
  const user = useSelector((state) => state.user);
  // console.log("user : ", user);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <CalendarGrid />
    </Box>
    // <TaskPage/>
  );
};

export default LandingPage;
