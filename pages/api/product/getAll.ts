import type {NextApiRequest, NextApiResponse} from "next"
import prisma from "../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    return;
  }

  const result = await prisma.product.findMany({})

  if (result) {
    res.status(200).json(result)
  } else {
    res.status(422).json({message: 'Prisma error occured', error: true})
  }
}

export default handler