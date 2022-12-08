// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import type { User } from "../../../models/user";
import { user } from "../../../mockData";
import {
  CustomError,
  respondErrorBadId,
  respondErrorIdNotFound,
} from "../../../helpers";

export default function getUserById(
  req: NextApiRequest,
  res: NextApiResponse<User | CustomError>
) {
  const { id } = req.query;
  if (typeof id !== "string") {
    respondErrorBadId(res, id);
    return;
  }

  // fetch API data
  const gotUser = user;
  if (gotUser.id !== id) {
    respondErrorIdNotFound(res, id);
    return;
  }

  res.status(200).json(user);
}
