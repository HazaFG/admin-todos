//con use server estamos forzando que esto se ejecute del lado del servidor, pero que a su vez podamos mandarlo a llamar, esto es muy muy pro
"use server"

import { Todo } from "@/generated/prisma"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export const sleep = async (seconds: number = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)

    }, seconds * 1000)

  })
}

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  await sleep(3)

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

export const addTodo = async (description: string) => {

  try {
    const todo = await prisma.todo.create({ data: { description } })
    revalidatePath('/dashboard/server-todo')
    return todo;

  } catch (error) {
    return {
      message: 'Error creando todo'
    }
  }
}

export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({ where: { complete: true } })
  revalidatePath('/dashboard/server-todo')
}
