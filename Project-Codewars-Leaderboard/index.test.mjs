// This is a placeholder file which shows how you use the nock library to
// "mock" fetch requests, replacing real requests with fake ones that you
// control in the test. This means you can "force" the fetch request to return
// data in the format that you want.
// IMPORTANT: You _must_ run npm install within the Project-Codewars-Leaderboard
// folder for this to work.
// You can change or delete the contents of the file once you have understood
// how it works.

import test from "node:test";
import assert from "node:assert";
import nock from "nock";
import { fetchData } from "./api.mjs";
nock.disableNetConnect();

test("fetchData returns correct user data from codewaars", async () => {
  const mockUsername = "evelyn122";
  const mockData = {
    username: "evelyn122",
    clan: "Mothers Who Code",
    ranks: {
      overall: {
        score: 1420,
      },
      languages: {
        javascript: {
          score: 800,
        },
        python: {
          score: 620,
        },
      },
    },
  };

  // Create a fetch request "mock" using the nock library, which "replaces"
  // real requests with fake ones that we can control in the test using nock
  // functions.
  // In this example, we set up nock so that it looks for GET requests to
  // https://example.com/test (no other URLs will work) and responds with a 200
  // HTTP status code, and the body {"user": "someone"}.
  const scope = nock("https://www.codewars.com")
    .get(`/api/v1/users/${mockUsername}`)
    .reply(200, mockData);

  // Check that the response we got back included the fake body we set up.
  const data = await fetchData(mockUsername);

  //assert(parsedResponse.user === "someone");
  assert.deepEqual(data, mockData, "Fetched user data does not match expected");
  assert(scope.isDone(), "Expected fetch call was not made");
  // Ensure that a fetch request has been replaced by the nock library. This
  // helps ensure that you're not making real fetch requests that don't match
  // the nock configuration.
  //assert(scope.isDone() === true, "No matching fetch request has been made");
});
