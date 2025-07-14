'use client'


import { Todo } from "@/generated/prisma";

export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {
  const body = { complete: complete };

  //Realizar peticion http, si la realizamos del lado del servidor entonces necesitamos poner la url completa
  const dbTodo = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }

  }).then(res => res.json())
  console.log(dbTodo)

  return dbTodo;
}

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description: description };

  //Realizar peticion http, si la realizamos del lado del servidor entonces necesitamos poner la url completa
  const dbCrearTodo = await fetch(`/api/todos/`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }

  }).then(res => res.json())
  console.log(dbCrearTodo)

  return dbCrearTodo;
}

