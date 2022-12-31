// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import type { Job } from "../../../models/job";
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

export default function handleJob(
  req: NextApiRequest,
  res: NextApiResponse<Job | CustomSuccess | CustomError>
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
      getJobById(req, res, id);
      return;
    case "PUT":
      updateJobById(req, res, id);
      return;
    case "DELETE":
      deleteJobById(req, res, id);
      return;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} not allowed`);
  }
}

const TABLE_NAME = "job";

async function getJobById(
  req: NextApiRequest,
  res: NextApiResponse<Job | CustomError>,
  id: string
) {
  // query db
  const dbParams = {
    TableName: TABLE_NAME,
    Key: { id: id },
  };

  try {
    const data = await ddbDocClient.send(new GetCommand(dbParams));
    if (!data?.Item) {
      respondErrorIdNotFound(res, id);
      return;
    }
    res.status(200).json(data.Item as unknown as Job);
  } catch (err) {
    console.error(err);
    respondErrorDB(res);
  }
}

async function updateJobById(
  req: NextApiRequest,
  res: NextApiResponse<Job | CustomError>,
  id: string
) {
  const body = req.body;
  if (!isValidJob(body)) {
    respondErrorBadRequest(res);
    return;
  }

  // convert request body to write-model for DB
  const writeJob: Job = {
    id: id, // not modifiable
    name: body.name,
    position: body.position,
    description: body.description,
    startDate: body.startDate,
    endDate: body.endDate,
  };

  // update DB
  const dbParams = {
    TableName: TABLE_NAME,
    Key: { id: id },
    ExpressionAttributeNames: {
      "#name": "name",
      "#position": "position",
      "#description": "description",
      "#startDate": "startDate",
      "#endDate": "endDate",
    },
    UpdateExpression:
      "SET #name = :name, #position = :position, #description = :description, #startDate = :startDate, #endDate = :endDate",
    ExpressionAttributeValues: {
      ":name": writeJob.name,
      ":position": writeJob.position,
      ":description": writeJob.description,
      ":startDate": writeJob.startDate,
      ":endDate": writeJob.endDate,
    },
    ConditionExpression: "attribute_exists(id)",
    ReturnValues: "ALL_NEW",
  };

  try {
    const data = await ddbDocClient.send(new UpdateCommand(dbParams));
    res.status(200).json(data.Attributes as unknown as Job);
  } catch (err: any) {
    console.error(err);
    if (err?.name === "ConditionalCheckFailedException") {
      respondErrorIdNotFound(res, id);
      return;
    }
    respondErrorDB(res);
  }
}

async function deleteJobById(
  req: NextApiRequest,
  res: NextApiResponse<CustomSuccess | CustomError>,
  id: string
) {
  const dbParams = {
    TableName: TABLE_NAME,
    Key: { id: id },
    ConditionExpression: "attribute_exists(id)",
  };

  try {
    const data = await ddbDocClient.send(new DeleteCommand(dbParams));
    res.status(200).json(`Success, job (${id}) was deleted.` as CustomSuccess);
  } catch (err: any) {
    console.error(err);
    if (err?.name === "ConditionalCheckFailedException") {
      respondErrorIdNotFound(res, id);
      return;
    }
    respondErrorDB(res);
  }
}

export function isValidJob(body: any): body is Job {
  if (
    !body ||
    !body.name ||
    !body.position ||
    !body.description ||
    body.startDate == null
  ) {
    return false;
  }

  return true;
}
