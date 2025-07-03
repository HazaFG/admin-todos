import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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

  const users = await prisma.users.findMany({
    //esta cosa espera un number, pero con el +agarrar estamos convirtiendo ese string 'take' a un number
    take: agarrar,
    skip: skipear
  })

  return NextResponse.json(users)
}
