import { NextApiResponse } from "next";

export type CustomError = {
  name: string;
  message: string;
};

export function respondErrorBadId(
  res: NextApiResponse<any | CustomError>,
  id: any
) {
  const customError: CustomError = {
    name: "id_invalidFormat",
    message: `id (${id}) incorrectly formatted`,
  };

  res.status(400).json(customError);
}

export function respondErrorIdNotFound(
  res: NextApiResponse<any | CustomError>,
  id: any
) {
  const customError: CustomError = {
    name: "id_notFound",
    message: `id (${id}) not found`,
  };

  res.status(404).json(customError);
}

export function respondErrorBadRequest(
  res: NextApiResponse<any | CustomError>
) {
  const customError: CustomError = {
    name: "request_invalidFormat",
    message: `body format invalid`,
  };

  res.status(400).json(customError);
}
