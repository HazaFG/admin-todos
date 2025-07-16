//con use server estamos forzando que esto se ejecute del lado del servidor, pero que a su vez podamos mandarlo a llamar, esto es muy muy pro
"use server"

import { Todo } from "@/generated/prisma"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } })

  if (!todo) {
    throw `Todo con id ${id} no encontrado`
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete: complete }
  })

  revalidatePath('/dashboard/server-todo')

  return updatedTodo;

}
