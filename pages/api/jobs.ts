// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Job } from "../../models/job";
import { jobs } from "../../mockData";
import { CustomError, respondErrorBadRequest } from "../../helpers";
import { isValidJob } from "./jobs/[id]";
import { nanoid } from "nanoid";

export default function handleJob(
  req: NextApiRequest,
  res: NextApiResponse<Job | Job[] | CustomError>
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

async function getAllJobs(req: NextApiRequest, res: NextApiResponse<Job[]>) {
  // query db
  const gotJobs = jobs;

  res.status(200).json(gotJobs);
}
async function createJob(
  req: NextApiRequest,
  res: NextApiResponse<Job | Job[] | CustomError>
) {
  const body = req.body;
  if (!isValidJob(body)) {
    respondErrorBadRequest(res);
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
  jobs.push(writeJob);

  res.status(200).json(writeJob);
}
