// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import type { Event } from "../../../models/event";
import { events } from "../../../mockData";
import {
  CustomError,
  respondErrorBadId,
  respondErrorBadRequest,
  respondErrorIdNotFound,
} from "../../../helpers";

export default function handleEvent(
  req: NextApiRequest,
  res: NextApiResponse<Event | string | CustomError>
) {
  const {
    query: { id, name },
    method,
  } = req;
  if (typeof id !== "string") {
    respondErrorBadId(res, id);
    return;
  }

  switch (method) {
    case "GET":
      getEventById(req, res, id);
      return;
    case "PUT":
      updateEventById(req, res, id);
      return;
    case "DELETE":
      deleteEventById(req, res, id);
      return;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} not allowed`);
  }
}

async function getEventById(
  req: NextApiRequest,
  res: NextApiResponse<Event | CustomError>,
  id: string
) {
  // fetch API data
  const gotEvent = events.filter((event) => event.id === id);
  if (!gotEvent || !gotEvent[0]) {
    respondErrorIdNotFound(res, id);
    return;
  }

  res.status(200).json(gotEvent[0]);
}

async function updateEventById(
  req: NextApiRequest,
  res: NextApiResponse<Event | CustomError>,
  id: string
) {
  const body = req.body;
  if (!isValidEvent(body)) {
    respondErrorBadRequest(res);
    return;
  }

  // convert request body to write-model for DB
  const writeEvent: Event = {
    id: id, // not modifiable
    title: body.title,
    description: body.description,
    date: body.date,
    images: body.images,
  };

  // update DB
  const gotEvent = events.find((event) => event.id === id);
  if (!gotEvent) {
    respondErrorIdNotFound(res, id);
    return;
  }
  Object.assign(gotEvent, writeEvent);

  res.status(200).json(gotEvent);
}

async function deleteEventById(
  req: NextApiRequest,
  res: NextApiResponse<string | CustomError>,
  id: string
) {
  // remove from DB
  const gotEventIndex = events.findIndex((event) => event.id === id);
  if (gotEventIndex === -1) {
    respondErrorIdNotFound(res, id);
    return;
  }

  events.splice(gotEventIndex, 1);

  res.status(200).json("successfully deleted event " + id);
}

export function isValidEvent(body: any): body is Event {
  if (!body || !body.title || !body.description || body.date == null) {
    return false;
  }

  return true;
}
