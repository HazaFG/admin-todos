import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

  await prisma.users.deleteMany()

  const usuario = await prisma.users.createMany({
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

  const results = await prisma.users.findMany({
    skip: 3,
    take: 1,
  })

  console.log('el resultado de la busqueda es', results)
  // console.log(usuario)

  return NextResponse.json({
    user: 'Los usuarios han sido creados'
  })
}
