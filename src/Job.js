import React from "react";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

// todo factor these into constants file
const ONE_DAY_MS = 24 * 3600 * 1000;

// returns a date like Fri Jun 14
function getMDY(ts) {
  return ts
    .toDateString()
    .split(" ")
    .slice(0, 3)
    .join(" ");
}

// makeDate takes a TS and returns a date like Fri Jun 14
// if it's today or yesterday, it returns that instead
export function makeDate(timestamp) {
  const date = new Date(timestamp);
  const dateStr = getMDY(date);
  const todayStr = getMDY(new Date());
  const yesterdayStr = getMDY(new Date(Date.now() - ONE_DAY_MS));
  if (dateStr === todayStr) {
    return "today";
  } else if (dateStr === yesterdayStr) {
    return "yesterday";
  } else {
    return dateStr;
  }
}

export default function Job({ job, onClick }) {
  return (
    <Paper onClick={onClick} className="job">
      <div className="flex-align-mid">
        <div className="job-title-location">
          <Typography className="job-title" variant="h6">{job.title}</Typography>
          <Typography className="job-company" variant="h5">{job.company}</Typography>
          <Typography className="job-location">{job.location}</Typography>
        </div>
      </div>
      <div className="flex-align-mid">
        <Typography className="job-posted-date">{makeDate(job.created_at)}</Typography>
      </div>
    </Paper>
  );
}
