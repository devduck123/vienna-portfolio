import type { NextApiRequest, NextApiResponse } from "next";
import type { Event } from "../../models/event";
import { isValidEvent } from "./events/[id]";
import {
  CustomError,
  CustomSuccess,
  respondErrorBadRequest,
  respondErrorDB,
} from "../../helpers";
import { nanoid } from "nanoid";
import { ddbDocClient } from "../../config/db";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export default function handleEvent(
  req: NextApiRequest,
  res: NextApiResponse<CustomSuccess | Event[] | CustomError>
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

const TABLE_NAME = "event";

async function getAllEvents(
  req: NextApiRequest,
  res: NextApiResponse<Event[] | CustomError>
) {
  // query db
  const dbParams = {
    TableName: TABLE_NAME,
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(dbParams));
    res.status(200).json(data.Items as unknown as Event[]);
  } catch (err) {
    console.error(err);
    respondErrorDB(res);
  }
}

async function createEvent(
  req: NextApiRequest,
  res: NextApiResponse<CustomSuccess | CustomError>
) {
  const body = req.body;
  if (!isValidEvent(body)) {
    respondErrorBadRequest(res);
    return;
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
  const dbParams = {
    TableName: TABLE_NAME,
    Item: writeEvent,
  };

  try {
    const data = await ddbDocClient.send(new PutCommand(dbParams));
    res
      .status(200)
      .json(
        `Successfully created event. (ID is ${writeEvent.id})` as CustomSuccess
      );
  } catch (err) {
    console.error(err);
    respondErrorDB(res);
  }
}
