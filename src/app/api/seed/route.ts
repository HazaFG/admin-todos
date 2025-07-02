import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {

  await prisma.todo.deleteMany()

  await prisma.todo.createMany({
    data: [
      { description: 'Piedra del alma', complete: true },
      { description: 'Piedra del poder' },
      { description: 'Piedra del tiempo' },
      { description: 'Piedra del espacio' },
      { description: 'Piedra de la realidad' },
    ]
  })

  //hay que hacer una insercion en la base de datos
  //preparar insercion este prisma es el que usaste en src/lib/prisma.ts
  // const todo = await prisma.todo.create({
  //   //la data es basicamente la informacion que yo quiero insertar en un todo
  //   data: { description: 'Piedra del alma' }
  // })

  // console.log(todo)

  return NextResponse.json({
    message: 'Seed Executed'
  })
}
