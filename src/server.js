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
        description: "Front end developer"
      });
      server.create("job", {
        title: "Jan",
        company: "Y corp",
        location: "Bangalore",
        created_at: "Mon Jan 29 01:01:19 UTC 2020",
        source: "google",
        company_logo: "https://picsum.photos/seed/picsum/400/600",
        description: "Back end developer"
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
