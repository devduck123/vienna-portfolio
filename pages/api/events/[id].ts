import type { NextApiRequest, NextApiResponse } from "next";
import type { Event } from "../../../models/event";
import {
  CustomError,
  CustomSuccess,
  respondErrorBadId,
  respondErrorBadRequest,
  respondErrorDB,
  respondErrorIdNotFound,
} from "../../../helpers";
import { ddbDocClient } from "../../../config/db";
import {
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

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

const TABLE_NAME = "event";

async function getEventById(
  req: NextApiRequest,
  res: NextApiResponse<Event | CustomError>,
  id: string
) {
  const dbParams = {
    TableName: TABLE_NAME,
    Key: {
      id: id,
    },
  };

  try {
    const data = await ddbDocClient.send(new GetCommand(dbParams));
    if (!data?.Item) {
      respondErrorIdNotFound(res, id);
      return;
    }
    res.status(200).json(data.Item as unknown as Event);
  } catch (err) {
    console.error(err);
    respondErrorDB(res);
  }
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

  const dbParams = {
    TableName: TABLE_NAME,
    Key: { id: id },
    ExpressionAttributeNames: {
      "#title": "title",
      "#description": "description",
      "#date": "date",
      "#images": "images",
    },
    UpdateExpression:
      "SET #title = :title, #description = :description, #date = :date, #images = :images",
    ExpressionAttributeValues: {
      ":title": writeEvent.title,
      ":description": writeEvent.description,
      ":date": writeEvent.date,
      ":images": writeEvent.images,
    },
    ConditionExpression: "attribute_exists(id)",
    ReturnValues: "ALL_NEW",
  };

  try {
    const data = await ddbDocClient.send(new UpdateCommand(dbParams));
    res.status(200).json(data.Attributes as unknown as Event);
  } catch (err: any) {
    console.error(err);
    if (err?.name === "ConditionalCheckFailedException") {
      respondErrorIdNotFound(res, id);
      return;
    }
    respondErrorDB(res);
  }
}

async function deleteEventById(
  req: NextApiRequest,
  res: NextApiResponse<CustomSuccess | CustomError>,
  id: string
) {
  const dbParams = {
    TableName: TABLE_NAME,
    Key: {
      id: id,
    },
    ConditionExpression: "attribute_exists(id)",
  };

  try {
    const data = await ddbDocClient.send(new DeleteCommand(dbParams));
    res
      .status(200)
      .json(`Success, event (${id}) was deleted.` as CustomSuccess);
  } catch (err: any) {
    console.error(err);
    if (err?.name === "ConditionalCheckFailedException") {
      respondErrorIdNotFound(res, id);
      return;
    }
    respondErrorDB(res);
  }
}

export function isValidEvent(body: any): body is Event {
  if (!body || !body.title || !body.description || body.date == null) {
    return false;
  }

  return true;
}
