// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import type { Event } from "../../models/event";
import { events } from "../../mockData";

export default function getAllEvents(
  req: NextApiRequest,
  res: NextApiResponse<Event[]>
) {
  // fetch API data
  const gotEvents = events;

  res.status(200).json(gotEvents);
}
