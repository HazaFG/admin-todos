import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

  const usuario = await prisma.users.create({
    data: { name: 'Hazael', description: 'es pro' }
  })

  console.log(usuario)

  return NextResponse.json({
    user: 'El usuario Hazael ha sido creado'
  })
}
