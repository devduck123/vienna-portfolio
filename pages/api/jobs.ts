// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import type { Job } from "../../models/job";
import { jobs } from "../../mockData";

export default function getAllJobs(
  req: NextApiRequest,
  res: NextApiResponse<Job[]>
) {
  // fetch API data
  const gotJobs = jobs;

  res.status(200).json(gotJobs);
}
