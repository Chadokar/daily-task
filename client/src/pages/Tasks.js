import { Grid } from "@mui/material";
import CompletedProblems from "../components/CompletedProblems";
import TaskPage from "../components/SuggestionsPage";

export default function Tasks() {
    return (
        <Grid container >
            <Grid items xs={6}>
                <CompletedProblems/>
            </Grid>
            <Grid items xs={6}>
                <TaskPage/>
            </Grid>
        </Grid>
        
    )
}