import type { NextApiRequest, NextApiResponse } from "next";
import type { Event } from "../../models/event";
import { events } from "../../mockData";
import { isValidEvent } from "./events/[id]";
import { CustomError, respondErrorBadRequest } from "../../helpers";
import { nanoid } from 'nanoid'

export default function handleEvent(
  req: NextApiRequest,
  res: NextApiResponse<Event | Event[] | CustomError>
) {
  const {
    query: { name },
    method,
  } = req;

  switch (method) {
    case "GET":
      getAllEvents(req, res);
      return;
    case "POST":
      createEvent(req, res);
      return;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} not allowed`);
  }
}

async function getAllEvents(
  req: NextApiRequest,
  res: NextApiResponse<Event[]>
) {
  // query db
  const gotEvents = events;

  res.status(200).json(gotEvents);
}

async function createEvent(
  req: NextApiRequest,
  res: NextApiResponse<Event | CustomError>
) {
  const body = req.body;
  if (!isValidEvent(body)) {
    respondErrorBadRequest(res);
  }

  // map body with DTO
  const writeEvent: Event = {
    id: nanoid(),
    title: body.title,
    description: body.description,
    date: body.date,
    images: body.images,
  };

  // write to db
  events.push(writeEvent);

  res.status(200).json(writeEvent);
}
