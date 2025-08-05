import { usersTodos } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  }
}

const getTodoById = async (id: string): Promise<usersTodos | null> => {
  const user = await prisma.usersTodos.findFirst({ where: { id } })
  return user;
}

export async function GET(request: Request, { params }: Segments) {
  const user = await getTodoById(params.id)
  console.log(request)
  console.log('este es el user', user)

  if (!user) {
    return NextResponse.json(
      { message: `El user con el ${params.id} no existe` },
      { status: 400 }
    )
  }

  return NextResponse.json(user)
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  name: yup.string(),
  description: yup.string().optional()
})

export async function PUT(request: Request, { params }: Segments) {

  //Aqui no usaremos una funcion como la del getTodoById, lo obtendremos con destructuracion
  const { id } = params;
  const user = await prisma.usersTodos.findFirst({ where: { id } })

  if (!user) {
    return NextResponse.json(
      { message: `User con el id ${id} no existe` },
      { status: 400 },
    )
  }

  try {
    const { complete, name, description } = await putSchema.validate(await request.json())
    const updatedUser = await prisma.usersTodos.updateMany({ where: { id }, data: { complete, name, description } })
    return NextResponse.json({ message: 'User editado con exito', updatedUser })

  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}

