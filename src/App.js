import React from "react";
import "./App.css";
import Jobs from "./Jobs";

const JOB_API_URL = "/api/jobs";

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  let json = await res.json();
  // This was the adjustment made for Cypress
  // TODO: find out the cause
  updateCb(json.jobs);
}

function App() {
  const [jobList, updateJobs] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, []);

  return <Jobs jobs={jobList} />;
}

export default App;
