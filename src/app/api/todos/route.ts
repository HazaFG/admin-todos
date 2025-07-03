import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  //Con esto vamos a practicar query params para nuestros endpoints
  const { searchParams } = new URL(request.url)

  //Con esto estamos seteando que el take siempre va a ser de 10
  const agarrar = Number(searchParams.get('take') ?? '10');
  const skipear = Number(searchParams.get('skip') ?? '0');

  //si el take no es un numero, tenemos que lanzar un error, que nos diga que error es
  if (isNaN(agarrar)) {
    return NextResponse.json(
      { message: 'Take tiene que ser un numero' },
      { status: 400 }// bad request
    )
  }

  if (isNaN(skipear)) {
    return NextResponse.json(
      { message: 'Skip tiene que ser un numero' },
      { status: 400 }// bad request
    )
  }

  const todos = await prisma.todo.findMany({
    //esta cosa espera un number, pero con el +agarrar estamos convirtiendo ese string 'take' a un number
    take: agarrar,
    skip: skipear
  })

  return NextResponse.json(todos);
}
