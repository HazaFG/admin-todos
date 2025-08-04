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

  await prisma.usersTodos.createMany({
    data: [
      { name: 'Hazael', description: 'es pro' },
      { name: 'Andrea', description: 'Es hermosisima' },
      { name: 'Abdiel', description: 'e una rata sucia' },
      { name: 'Juan pepe', description: 'es pro' },
      { name: 'Etesech', description: 'es pro' },
      { name: 'Popo de burro', description: 'equis de' },
      { name: 'yon', description: 'asdfasdf' },
      { name: 'uriel', description: 'no se xd' },
      { name: 'papayu', description: 'es otra rata' },
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
