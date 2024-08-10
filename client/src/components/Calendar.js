import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Utility functions to get the month and year, and the days of the week and dates
const getDaysOfWeek = () => [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getDatesOfMonth = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay(); // Day of the week for the 1st of the month
  const lastDate = new Date(year, month + 1, 0).getDate(); // Last date of the month

  const dates = [];
  for (let i = 1; i <= lastDate; i++) {
    dates.push(new Date(year, month, i));
  }

  // Fill in the days before the start of the month
  const blankDays = Array(firstDay).fill(null);

  return [...blankDays, ...dates];
};

// Styled components
const CalendarContainer = styled("div")({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "black",
  color: "white",
});

const CalendarHeader = styled(Paper)({
  backgroundColor: "black",
  color: "white",
  padding: 16,
  textAlign: "center",
  borderBottom: "2px solid black",
  boxShadow: "none", // Remove shadow to ensure consistent look
});

const CalendarBody = styled("div")({
  flex: 1,
  overflow: "auto",
});

const DayOfWeek = styled(Paper)({
  backgroundColor: "black",
  color: "white",
  padding: 8,
  textAlign: "center",
  border: "1px solid black",
  boxShadow: "none", // Remove shadow to ensure consistent look
});

const DateCell = styled(Paper)({
  backgroundColor: "black",
  color: "white",
  padding: 16,
  textAlign: "center",
  border: "1px solid black",
  boxShadow: "none", // Remove shadow to ensure consistent look
});


const CalendarGrid = () => {
  const navigate = useNavigate();
  const enterSchedule = () => {
    navigate('/tasks');
  };

  const daysOfWeek = getDaysOfWeek();
  const datesOfMonth = getDatesOfMonth();

  const weeks = [];
  for (let i = 0; i < datesOfMonth.length; i += 7) {
    weeks.push(datesOfMonth.slice(i, i + 7));
  }

  // Get current month and year
  const today = new Date();
  const monthName = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();

  return (
    // give width 75% when screen size is for laptop else 100% use xs sm large etc breakpoints
    <CalendarContainer
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%", lg: "75%" },
      }}
    >
      {/* Header with month and year */}
      <CalendarHeader elevation={0}>
        <Typography variant="h6">{`${monthName} ${year}`}</Typography>
      </CalendarHeader>

      {/* Calendar grid */}
      <CalendarBody>
        <Grid
          container
          direction="row"
          spacing={0}
          style={{ height: "calc(100% - 64px)" }}
        >
          {/* Days of the week row */}
          {daysOfWeek.map((day, index) => (
            <Grid item xs key={index} style={{ border: "1px solid black" }}>
              <DayOfWeek elevation={0}>
                <Typography variant="body2">{day}</Typography>
              </DayOfWeek>
            </Grid>
          ))}

          {/* Dates of the current month */}
          {weeks.map((week, weekIndex) => (
            <Grid container item direction="row" key={weekIndex}>
              {week.map((date, dateIndex) => (
                <Grid
                  item
                  xs
                  key={dateIndex}
                  flex
                  style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                >
                  <Button fullWidth sx={{ height: "100%" }}>
                    <DateCell elevation={0}>
                      <Typography variant="body2">
                        {date ? date.getDate() : ""}
                      </Typography>
                    </DateCell>
                  </Button>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </CalendarBody>
    </CalendarContainer>
  );
};

export default CalendarGrid;
