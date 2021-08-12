// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../dbConnect";
import Task from "../../models/taskModel";
import { Data } from "./types";

// https://gist.github.com/jcxplorer/823878vo?
function uuid() {
  var uuid = "",
    i,
    random;
  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-";
    }
    uuid += (i == 12 ? 4 : i == 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { n },
    body,
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const quantity = parseInt(n as string);
        const tasks = await Task.find({}).limit(quantity || 3);
        res.status(200).json({ success: true, data: tasks });
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    case "PUT":
      res.status(200).json({ message: `Task ${body.id} has been updated` });
      break;
    case "POST":
      fetch(`https://lorem-faker.vercel.app/api?quantity=10`)
        .then((response) => response.json())
        .then((data) => {
          data.map(async (title: string) => {
            await Task.create({ id: uuid(), title });
          });

          res.status(200).json({ message: `Bulk loaded` });
        });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
