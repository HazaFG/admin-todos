'use client'

import * as todoApi from '@/todos-users/helpers/users'
import { useRouter } from "next/navigation";

export const NewUser = () => {
  const router = useRouter();

  const handleDeleteUser = async () => {
    const deleteUser = await todoApi.deleteUser()
    router.refresh();
    return deleteUser;
  }

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que se recargue la página

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const complete = false;

    await todoApi.createUser(complete, name, description)

    router.refresh();
  }

  return (
    <form className='flex  w-full' onSubmit={handleCreateUser}>
      <div className="flex flex-col">
        <input type="text"
          className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
          placeholder="Ingrese el nuevo nombre"
          name="name" />

        <input type="text"
          className="w-full mb-4 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
          placeholder="Aqui ingrese su descripcion"
          name="description" />
      </div>
      <div className="flex gap-4 mb-4">
        <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">Crear</button>

        <button
          onClick={handleDeleteUser}
          type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">Borrar completados</button>
      </div >

    </form>
  )
}
