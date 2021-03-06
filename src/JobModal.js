import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Chip from "@material-ui/core/Chip";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function JobModal({ job, open, handleClose }) {
  if (!job.title) {
    return <div />;
  }

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {job.title} - {job.company}
          <img
            className="detail-logo"
            src={job.company_logo}
            style={{ marginLeft: "20px", width: "60px", height: "60px" }}
            alt="company_logo"
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="job-source">
            <Chip size="small" label={`from ${job.source}`} />
          </DialogContentText>
          <DialogContentText
            id="job-description"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </DialogContent>
        <DialogActions>
          <Button className="button-close" onClick={handleClose} color="primary">
            Close
          </Button>
          <a href={job.url} className="button-apply" target="_blank" rel="noopener noreferrer">
            <Button color="primary">Apply</Button>
          </a>
        </DialogActions>
      </Dialog>
  );
}
