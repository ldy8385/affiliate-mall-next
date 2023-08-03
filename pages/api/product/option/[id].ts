import type {NextApiRequest, NextApiResponse} from "next"
import prisma from "../../../../lib/prisma"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return;
  }

  const id = parseInt(req.query.id)
  const result = await prisma.option.findMany({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      stock: true,
      createdAt: true,
      updatedAt: true,
    }
  })

  if (result) {
    res.status(200).json(result)
  } else {
    res.status(422).json({message: 'Prisma error occured', error: true})
  }
}

export default handler