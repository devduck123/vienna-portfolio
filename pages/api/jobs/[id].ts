// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import type { Job } from "../../../models/job";
import { jobs } from "../../../mockData";
import {
  CustomError,
  respondErrorBadId,
  respondErrorBadRequest,
  respondErrorIdNotFound,
} from "../../../helpers";

export default function handleJob(
  req: NextApiRequest,
  res: NextApiResponse<Job | string | CustomError>
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

async function getJobById(
  req: NextApiRequest,
  res: NextApiResponse<Job | CustomError>,
  id: string
) {
  // query db
  const gotJob = jobs.find((job) => job.id === id);
  if (!gotJob) {
    respondErrorIdNotFound(res, id);
    return;
  }

  res.status(200).json(gotJob);
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
  const gotJob = jobs.find((job) => job.id === id);
  if (!gotJob) {
    respondErrorIdNotFound(res, id);
    return;
  }
  Object.assign(gotJob, writeJob);

  res.status(200).json(gotJob);
}

async function deleteJobById(
  req: NextApiRequest,
  res: NextApiResponse<string | CustomError>,
  id: string
) {
  // remove from DB
  const gotJobIndex = jobs.findIndex((job) => job.id === id);
  if (gotJobIndex === -1) {
    respondErrorIdNotFound(res, id);
    return;
  }

  jobs.splice(gotJobIndex, 1);

  res.status(200).json("successfully deleted job " + id);
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
