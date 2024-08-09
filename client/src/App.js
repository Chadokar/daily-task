import "./App.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Navigation from "./pages/Navigation";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navigation />
          <ToastContainer />
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
