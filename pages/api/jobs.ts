// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Job } from "../../models/job";
import {
  CustomError,
  CustomSuccess,
  respondErrorBadRequest,
  respondErrorDB,
} from "../../helpers";
import { isValidJob } from "./jobs/[id]";
import { nanoid } from "nanoid";
import { ddbDocClient } from "../../config/db";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export default function handleJob(
  req: NextApiRequest,
  res: NextApiResponse<CustomSuccess | Job[] | CustomError>
) {
  const {
    query: { name },
    method,
  } = req;

  switch (method) {
    case "GET":
      getAllJobs(req, res);
      return;
    case "POST":
      createJob(req, res);
      return;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} not allowed`);
  }
}

const TABLE_NAME = "job";

async function getAllJobs(
  req: NextApiRequest,
  res: NextApiResponse<Job[] | CustomError>
) {
  // query db
  const dbParams = {
    TableName: TABLE_NAME,
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(dbParams));
    res.status(200).json(data.Items as unknown as Job[]);
  } catch (err) {
    console.error(err);
    respondErrorDB(res);
  }
}
async function createJob(
  req: NextApiRequest,
  res: NextApiResponse<CustomSuccess | CustomError>
) {
  const body = req.body;
  if (!isValidJob(body)) {
    respondErrorBadRequest(res);
    return;
  }

  // map body with DTO
  const writeJob: Job = {
    id: nanoid(),
    name: body.name,
    position: body.position,
    description: body.description,
    startDate: body.startDate,
    endDate: body.endDate,
  };

  // write to db
  const dbParams = {
    TableName: TABLE_NAME,
    Item: writeJob,
  };

  try {
    const data = await ddbDocClient.send(new PutCommand(dbParams));
    res
      .status(200)
      .json(
        `Successfully created job. (ID is ${writeJob.id})` as CustomSuccess
      );
  } catch (err) {
    console.error(err);
    respondErrorDB(res);
  }
}
