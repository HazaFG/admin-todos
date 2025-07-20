'use client'

import { users } from "@/generated/prisma"
import { ImOnedrive } from "react-icons/im";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import * as usersHelpers from '@/todos-users/helpers/users'
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

interface Props {
  user: users,
}

export const UsersItem = ({ user }: Props) => {
  const router = useRouter();

  const editUser = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;

    try {
      const updatedUser = await usersHelpers.updateUser(user.id, user.complete, name, description);
      console.log('Usuario editado:', updatedUser);
      router.refresh();
    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  }

  const toggleUserComplete = async (id: string, complete: boolean, name: string, description: string) => {
    const updatedTodo = await usersHelpers.updateUser(id, complete, name, description)
    router.refresh();
    console.log(updatedTodo)
    return updatedTodo;
  }

  return (
    <div
      className={`py-4 px-6 rounded-lg shadow-md flex flex-col sm:gap-0`}>
      <div className="flex flex-cols sm:flex-row justify-start items-center gap-4">
        <div className={`
         flex p-2 rounded-md cursor-pointer
         hover:bg-opacity-60
         bg-blue-100
        `}>
          {
            user.complete ? <IoCheckmarkDoneCircle size={30} /> : <ImOnedrive></ImOnedrive>
          }
        </div>

        <div className="text-center sm:text-left">
          {user.name}
        </div>

        <div className="text-center sm:text-left">
          {user.description}
        </div>

        <form onSubmit={editUser} className="">
          <input
            type="text"
            name="name"
            placeholder="Nuevo nombre"
            className="border px-2 py-1 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Nueva descripción"
            className="border px-2 py-1 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition-all"
          >
            Editar
          </button>
          <button type="button" onClick={() => toggleUserComplete(user.id, !user.complete, user.name, user.description)}>
            <label className="relative inline-block w-[60px] h-[34px] ">
              <input type="checkbox" className="peer opacity-0 w-0 h-0 " defaultChecked={user.complete} />
              <span className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 transition duration-400 rounded-full"></span>
              <span className="absolute left-1 bottom-1 w-[26px] h-[26px] bg-white rounded-full transition duration-400 peer-checked:translate-x-[26px]"></span>
            </label>
          </button>
        </form>

      </div>
    </div>
  )
}
