import { handler } from "./analyzeRegulation.js";

const mockEvent = {
  body: JSON.stringify({
    text: "European Parliament introduces export restrictions on AI chips.",
  }),
};

handler(mockEvent).then((response) => {
  console.log("Lambda response:");
  console.log(JSON.parse(response.body));
});