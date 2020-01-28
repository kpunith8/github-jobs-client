import { makeServer } from "../../src/server";
import { makeDate } from "../../src/Job";

describe("Jobs Landing Page", () => {
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
      description: "Front end developer",
      url:
        "https://jobs.github.com/positions/432bdc8c-b824-44a8-9421-eb7ccdd8f4be"
    });

    server.create("job", {
      title: "Jan",
      company: "Y corp",
      location: "Bangalore",
      created_at: "Mon Jan 29 01:01:19 UTC 2020",
      source: "google",
      company_logo: "https://picsum.photos/id/33/200/300",
      description: "Back end developer",
      url:
        "https://jobs.github.com/positions/d8a09f8c-64c9-47c5-b64c-7c48c2e35850"
    });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should load the home page", () => {
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
      .should("contain.text", `${server.db.jobs[1].title}`)
      .get(".job-company")
      .should("contain.text", `${server.db.jobs[1].company}`)
      .get(".job-location")
      .should("contain.text", `${server.db.jobs[1].location}`)
      .get(".job-posted-date")
      .should("contain.text", makeDate(`${server.db.jobs[1].created_at}`));
  });

  it("should display the pagination", () => {
    cy.visit("/");

    cy.get(".pagination-title").should("contain", "Page 1 of 1");
  });

  it("should display the back and next buttons disabled", () => {
    cy.visit("/");

    cy.get(".button-next").should("contain.text", "Next");
    cy.get(".button-next").should("be.disabled");

    cy.get(".button-prev").should("contain.text", "Back");
    cy.get(".button-prev").should("be.disabled");
  });

  it("should open the modal on clicking the job and should display proper details", () => {
    cy.visit("/");

    cy.get(".job")
      .first()
      .click();

    cy.get("#alert-dialog-slide-title").should(
      "contain.text",
      `${server.db.jobs[0].title} - ${server.db.jobs[0].company}`
    );
    cy.get("#alert-dialog-slide-title").should(
      "contain.text",
      `${server.db.jobs[0].title} - ${server.db.jobs[0].company}`
    );
    cy.get(".detail-logo").should("exist");
    cy.get("#job-source").should(
      "contain.text",
      `from ${server.db.jobs[0].source}`
    );
    cy.get("#job-description").should(
      "contain.html",
      `${server.db.jobs[0].description}`
    );
  });

  it("should close the modal on clicking the close button", () => {
    cy.visit("/");

    cy.get(".job")
      .first()
      .click();

    cy.get(".button-close").click();

    cy.get(".job-modal", { timeout: 2000 }).should("not.exist");
  });

  it("should have the proper url for apply button", () => {
    cy.visit("/");

    cy.get(".job")
      .first()
      .click();

    cy.get(".button-apply")
      .should("have.prop", "href")
      .and("equal", `${server.db.jobs[0].url}`);

    cy.get(".button-close").click();
  });
});
