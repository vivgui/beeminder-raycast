import { getPreferenceValues } from "@raycast/api";
import fetch from "node-fetch";

export async function fetchGoals() {
  const { beeminderApiToken, beeminderUsername } = getPreferenceValues();
  const goalsUrl = `https://www.beeminder.com/api/v1/users/${beeminderUsername}/goals?auth_token=${beeminderApiToken}`;

  const response = await fetch(goalsUrl).then((response) => response.json());

  return response;
}

export async function sendDatapoint(goalSlug, datapoint, comment) {
  const { beeminderApiToken, beeminderUsername } = getPreferenceValues();
  const datapointUrl = `https://www.beeminder.com/api/v1/users/${beeminderUsername}/goals/${goalSlug}/datapoints.json`;

  const response = await fetch(datapointUrl, {
    method: "POST",
    body: new URLSearchParams({
      auth_token: beeminderApiToken,
      value: datapoint.toString(),
      comment: comment,
    }),
  }).then((response) => response.json());

  return response;
}
