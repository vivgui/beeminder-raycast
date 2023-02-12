import { getPreferenceValues } from "@raycast/api";
import fetch from "node-fetch";
import { Goal, DataPointResponse, GoalErrors, Preferences } from "./types";

export async function fetchGoals(): Promise<Goal[] | GoalErrors> {
  const { beeminderApiToken, beeminderUsername } = getPreferenceValues<Preferences>();
  const goalsUrl = `https://www.beeminder.com/api/v1/users/${beeminderUsername}/goals?auth_token=${beeminderApiToken}`;

  const response = await fetch(goalsUrl).then((response) => response.json());

  return response as Goal[] | GoalErrors;
}

export async function sendDatapoint(
  goalSlug: string,
  datapoint: string,
  comment: string
): Promise<DataPointResponse> {
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

  return response as DataPointResponse;
}
