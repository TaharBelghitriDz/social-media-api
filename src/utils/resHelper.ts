import { Response } from "express";

export default (res: Response) => ({
  ...res,
  done(str: any, args?: { status?: number; resBody?: object }) {
    return res.status(args?.status || 200).json(args?.resBody || { data: str });
  },
  bad(str: string, args?: { status?: number; resBody?: object }) {
    return res.status(args?.status || 400).json(args?.resBody || { err: str });
  },
});
