import { NextApiResponse } from "next";

export type CustomSuccess = string;

export type CustomError = {
  name: string;
  message: string;
};

export function respondErrorBadId(res: NextApiResponse<CustomError>, id: any) {
  const customError: CustomError = {
    name: "id_invalidFormat",
    message: `id (${id}) incorrectly formatted`,
  };

  res.status(400).json(customError);
}

export function respondErrorIdNotFound(
  res: NextApiResponse<CustomError>,
  id: any
) {
  const customError: CustomError = {
    name: "id_notFound",
    message: `id (${id}) not found`,
  };

  res.status(404).json(customError);
}

export function respondErrorBadRequest(res: NextApiResponse<CustomError>) {
  const customError: CustomError = {
    name: "request_invalidFormat",
    message: `body format invalid`,
  };

  res.status(400).json(customError);
}

export function respondErrorDB(res: NextApiResponse<CustomError>) {
  const customError: CustomError = {
    name: "db_error",
    message: `database error`,
  };

  res.status(400).json(customError);
}
