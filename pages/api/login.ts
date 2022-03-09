// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { renameSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }
  const {username, password} = req.body;

  res.status(200).json({
    token: jwt.sign({
      username:username,
      admin:  username === "admin" && password === "admin"
    },"dev")
  })
}
