import type {NextApiRequest, NextApiResponse} from "next"
import {hashPassword} from "../../../lib/auth"
import prisma from "../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return
  }

  const data = req.body

  const {userId, name, password, phone} = data

  if (
    !userId ||
    !password ||
    password.trim().length < 4 ||
    !name ||
    !phone
  ) {
    res.status(422).json({
      message:
        'password should also be at least 4 characters long.',
      error: true,
    })
    return
  }

  const existingUser = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
      select: {
        userId: true, name: true,
      }
    }
  )

  if (existingUser) {
    res.status(422).json({message: 'User Email already exists!', error: true})
    return
  }

  const hashedPassword = await hashPassword(password)

  const result = await prisma.user.create({
    data: {
      userId: userId,
      name: name,
      phone: phone,
      password: hashedPassword,
    },
  })

  if (result) {
    res.status(201).json({message: 'Created user!', error: false})
  } else {
    res.status(422).json({message: 'Prisma error occured', error: true})
  }
}

export default handler