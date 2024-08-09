import "./App.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Navigation from "./pages/Navigation";
import { ToastContainer } from "react-toastify";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: "Arial",
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
