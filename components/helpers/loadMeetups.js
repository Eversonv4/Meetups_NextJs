import { apiURL } from "../../baseURL";

export async function LoadMeetups() {
  const response = await fetch(apiURL);

  const data = await response.json();

  let meetupsData = [];

  for (const key in data) {
    const meetup = {
      id: key,
      ...data[key],
    };
    meetupsData.push(meetup);
  }

  return meetupsData;
}
