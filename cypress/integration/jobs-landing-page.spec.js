import { makeServer } from "../../src/server";
import { makeDate } from "../../src/Job";

describe("Jobs API", () => {
  let server;
  beforeEach(() => {
    server = makeServer({ environment: "test" });

    server.create("job", {
      title: "Bob",
      company: "X corp",
      location: "Bangalore",
      created_at: "Mon Jan 27 01:01:19 UTC 2020",
      source: "google",
      company_logo: "https://picsum.photos/id/1/200/300",
      description: "Front end developer"
    });

    server.create("job", {
      title: "Jan",
      company: "Y corp",
      location: "Bangalore",
      created_at: "Mon Jan 29 01:01:19 UTC 2020",
      source: "google",
      company_logo: "https://picsum.photos/id/33/200/300",
      description: "Back end developer"
    });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should load the landing page", () => {
    cy.visit("/");

    cy.get(".page-title").contains("Entry Level Software Jobs");
    cy.get(".jobs-count").contains(`Found ${server.db.jobs.length} Jobs`);
  });

  it("should display the first job details", () => {
    cy.visit("/");

    cy.get(".job")
      .first()
      .get(".job-title")
      .should("contain", `${server.db.jobs[0].title}`)
      .get(".job-company")
      .should("contain", `${server.db.jobs[0].company}`)
      .get(".job-location")
      .should("contain", `${server.db.jobs[0].location}`)
      .get(".job-posted-date")
      .should("contain", makeDate(`${server.db.jobs[0].created_at}`));
  });

  it("should display the lost job details", () => {
    cy.visit("/");

    cy.get(".job")
      .first()
      .get(".job-title")
      .should("contain", `${server.db.jobs[1].title}`)
      .get(".job-company")
      .should("contain", `${server.db.jobs[1].company}`)
      .get(".job-location")
      .should("contain", `${server.db.jobs[1].location}`)
      .get(".job-posted-date")
      .should("contain", makeDate(`${server.db.jobs[1].created_at}`));
  });

  it("should display the pagination", () => {
    cy.visit("/");

    cy.get(".pagination-title").should("contain", "Page 1 of 1");
  });

  it('should open the modal on clicking the job', () => {
    cy.visit("/");

    cy.get(".job")
      .first()
      .click()
  })
});
