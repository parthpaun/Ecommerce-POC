/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { UnknownAction } from "@reduxjs/toolkit";

interface ConfirmPopupProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
  handleConfirm: () => UnknownAction | void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  title: string;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmPopup({
  open,
  setOpen,
  message,
  handleConfirm,
  title,
  confirmButtonText = "confirm",
  cancelButtonText = "cancel",
}: ConfirmPopupProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    handleConfirm();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            {cancelButtonText}
          </Button>
          <Button onClick={onConfirm} variant="contained">
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
