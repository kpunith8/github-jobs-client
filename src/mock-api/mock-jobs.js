import { Server } from "miragejs";

// This file is not required
export const getMockJobs = () =>
  new Server({
    routes() {
      this.namespace = "/api";

      this.get("/jobs", () => [
        {
          title: "Bob",
          company: "X corp",
          location: "Bangalore",
          created_at: "Mon Jan 27 01:01:19 UTC 2020",
          source: "google",
          company_logo:
            "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaGw5IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--45d9c448a301d863373f94d262008c302b077d80/download.png",
          description: "Front end developer"
        },
        {
          title: "Jan",
          company: "Y corp",
          location: "Bangalore",
          created_at: "Mon Jan 29 01:01:19 UTC 2020",
          source: "google",
          company_logo:
            "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaEo5IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f0e58e92b094aa07eecdf6901c7f0528a6d78a8d/HomeAdvisor-Logo.jpg",
          description: "Back end developer"
        }
      ]);
    }
  });
