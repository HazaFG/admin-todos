import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Segments {
  params: {
    id: string;
  }
}

//segments == params == lo que sea que haya en la ruta dinamica [id]
export async function GET(request: Request, { params }: Segments) {
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

  return NextResponse.json(todo)
}

export async function PUT(request: Request, { params }: Segments) {
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

  const body = await request.json()

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { ...body }
  })

  return NextResponse.json(updatedTodo)
}


