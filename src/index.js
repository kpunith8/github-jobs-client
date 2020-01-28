import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Server, Response } from "miragejs";
import { getMockJobs } from "./mock-api/mock-jobs";
import { makeServer } from "./server";

// For Cypress to setup the data
if (window.Cypress) {
  let cyServer = new Server({
    environment: "test",
    routes() {
      let methods = ["get", "put", "patch", "post", "delete"];
      methods.forEach(method => {
        this[method]("/*", async (schema, request) => {
          return await window.handleFromCypress(request);
        });
      });
    }
  });
  cyServer.logging = false;
} else {
  makeServer();
}

// For Local developement, if no real data exists
if (process.env.NODE_ENV === "development") {
  // getMockJobs();
}

ReactDOM.render(<App />, document.getElementById("root"));
