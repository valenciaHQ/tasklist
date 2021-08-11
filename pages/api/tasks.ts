// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Task = {
  id: string;
  title: string;
};

type Data = {
  result: Task[];
};

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

const getResult = async (quantity: number): Promise<Data> =>
  fetch(`https://lorem-faker.vercel.app/api?quantity=${quantity}`)
    .then((response) => response.json())
    .then((data) =>
      data.map((title: string) => {
        return { id: uuid(), title };
      })
    );

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { n = 3 },
    body,
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        getResult(+n).then((result) => res.status(200).json(result));
      } catch (error) {
        res.status(500).json("An error ocurred");
      }
      break;
    case "PUT":
      // Update or create data in your database
      res.status(200).json({ message: `Task ${body.id} has been updated` });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
