import React, { useState, forwardRef, Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSlide = ({ children, button }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <div style={{ cursor: "pointer" }} onClick={handleClickOpen}>
        {button || (
          <Box
            component="span"
            color="primary"
            sx={{ mr: 1, cursor: "pointer" }}
          >
            Open Dialog
          </Box>
        )}
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="100%"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {children}
      </Dialog>
    </Fragment>
  );
};

export default DialogSlide;
