import { NextResponse } from "next/server";
import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import * as yup from "yup";
import { Todo } from "@/generated/prisma";

interface Segments {
  params: {
    id: string;
  }
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserSessionServer();

  if (!user) {
    return null
  }

  const todo = await prisma.todo.findFirst({ where: { id } })

  if (todo?.userId !== user.id) {
    return null
  }

  return todo;
}

//segments == params == lo que sea que haya en la ruta dinamica [id]
export async function GET(request: Request, { params }: Segments) {

  const todo = await getTodo(params.id)
  console.log("Este es el todo", todo)

  if (!todo) {
    return NextResponse.json(
      { message: `Todo con id ${params.id} no existe` },
      { status: 404 }// not found
    )
  }

  return NextResponse.json(todo)
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
})

//Este lo vamos a dejar sin la funcion getTodo, para ver distintas soluciones jeje
export async function PUT(request: Request, { params }: Segments) {
  const user = await getUserSessionServer();

  if (!user) {
    return NextResponse.json('NO autorizado', { status: 401 })
  }

  //esto es destructuracion
  const { id } = params;
  const todo = await prisma.todo.findFirst({ where: { id } })
  console.log('este es el todo', todo)

  if (!todo) {
    return NextResponse.json(
      { message: `Todo con id ${id} no existe` },
      { status: 404 }// not found
    )
  }

  try {
    const { complete, description } = await putSchema.validate(await request.json())

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description }
    })

    return NextResponse.json({ message: 'Todo editado con exito', updatedTodo })

  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
