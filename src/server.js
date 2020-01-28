import { Server, Model } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      job: Model
    },

    seeds(server) {
      server.create("job", {
        title: "Bob",
        company: "X corp",
        location: "Bangalore",
        created_at: "Mon Jan 27 01:01:19 UTC 2020",
        source: "google",
        company_logo: "https://picsum.photos/seed/picsum/400/600",
        description: "Front end developer",
        url: "https://jobs.github.com/positions/432bdc8c-b824-44a8-9421-eb7ccdd8f4be"
      });
      server.create("job", {
        title: "Jan",
        company: "Y corp",
        location: "Bangalore",
        created_at: "Mon Jan 29 01:01:19 UTC 2020",
        source: "google",
        company_logo: "https://picsum.photos/seed/picsum/400/600",
        description: "Back end developer",
        url: "https://jobs.github.com/positions/d8a09f8c-64c9-47c5-b64c-7c48c2e35850"
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/jobs", schema => {
        return schema.jobs.all();
      });
    }
  });

  return server;
}
