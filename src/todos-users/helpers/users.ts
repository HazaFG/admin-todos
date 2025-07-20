'use client'

import { users } from "@/generated/prisma"

//Vamos a usar API Rest para los usuarios, y los todos lo mantendremos con server actions

//Esta funcion va a ser para el toggle de completado o no
export const updateUser = async (id: string, complete: boolean, name: string, description: string): Promise<users> => {
  const body = { complete: complete, name: name, description: description };

  const updatedUser = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }

  }).then(res => res.json())
  console.log(updatedUser);

  return updatedUser;
}

//Esta funcion va a ser para crear un usuario nuevo
export const createUser = async (complete: boolean, name: string, description: string): Promise<users> => {
  const body = { complete: complete, name: name, description: description };

  const updatedUser = await fetch(`/api/users/`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }

  }).then(res => res.json())
  console.log(updatedUser);

  return updatedUser;
}

export const deleteUser = async (): Promise<void> => {
  const updatedUser = await fetch(`/api/users/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  console.log(updatedUser);

  return updatedUser;
}
