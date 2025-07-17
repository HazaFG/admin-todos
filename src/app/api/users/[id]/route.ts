import { users } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Segments {
  params: {
    id: string;
  }
}

const getTodoById = async (id: string): Promise<users | null> => {
  const user = await prisma.users.findFirst({ where: { id } })
  return user
}

export async function GET(request: Request, { params }: Segments) {
  const user = await getTodoById(params.id)
  console.log('este es el user', user)

  if (!user) {
    return NextResponse.json(
      { message: `El user con el ${params.id} no existe` },
      { status: 400 }
    )
  }

  return NextResponse.json(user)
}
