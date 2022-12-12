// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import type { User } from "../../../models/user";
import { users } from "../../../mockData";
import {
  CustomError,
  respondErrorBadId,
  respondErrorBadRequest,
  respondErrorIdNotFound,
} from "../../../helpers";

export default function handleUser(
  req: NextApiRequest,
  res: NextApiResponse<User | CustomError>
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
      getUserById(req, res, id);
      return;
    case "PUT":
      updateUserById(req, res, id);
      return;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} not allowed`);
  }
}

async function getUserById(
  req: NextApiRequest,
  res: NextApiResponse<User | CustomError>,
  id: string
) {
  // query DB
  const gotUser = users.find((user) => user.id === id);
  if (!gotUser || !gotUser) {
    respondErrorIdNotFound(res, id);
    return;
  }

  res.status(200).json(gotUser);
}

async function updateUserById(
  req: NextApiRequest,
  res: NextApiResponse<User | CustomError>,
  id: string
) {
  const body = req.body;
  if (!isValidUser(body)) {
    respondErrorBadRequest(res);
    return;
  }

  // convert request body to write-model for DB
  const writeUser: User = {
    id: id, // not modifiable
    name: body.name,
    description: body.description,
    dateOfBirth: body.dateOfBirth,
  };

  // update DB
  const gotUser = users.find((user) => user.id === id);
  if (!gotUser) {
    respondErrorIdNotFound(res, id);
    return;
  }
  Object.assign(gotUser, writeUser);

  res.status(200).json(gotUser);
}

function isValidUser(body: any): body is User {
  if (!body || !body.name || !body.description || !body.dateOfBirth) {
    return false;
  }

  return true;
}
