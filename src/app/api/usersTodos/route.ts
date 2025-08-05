import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from 'yup'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const agarrar = Number(searchParams.get('take') ?? '10')
  const skipear = Number(searchParams.get('skip') ?? '0')

  if (isNaN(agarrar)) {
    return NextResponse.json({ message: 'Take tiene que ser un numero' }, { status: 400 })
  }

  if (isNaN(skipear)) {
    return NextResponse.json({ message: 'Skip tiene que ser un numero' }, { status: 400 })
  }

  const users = await prisma.usersTodos.findMany({
    //esta cosa espera un number, pero con el +agarrar estamos convirtiendo ese string 'take' a un number
    take: agarrar,
    skip: skipear
  })

  return NextResponse.json(users)
}

const userPostSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false)
})

export async function POST(request: Request) {

  try {
    const { complete, description, name } = await userPostSchema.validate(await request.json())
    const user = await prisma.usersTodos.create({ data: { complete, description, name } })
    return NextResponse.json(user)

  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }

}

export async function DELETE(request: Request) {
  try {
    const userDeleted = await prisma.usersTodos.deleteMany({ where: { complete: true } })
    return NextResponse.json(userDeleted)
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
