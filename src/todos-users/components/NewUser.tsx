'use client'

import { IoTrashOutline } from "react-icons/io5";
// import * as todoApi from '@/todos-users/helpers/users'
// import { useRouter } from "next/navigation";

// const editUser = async (id: string, complete: boolean, name: string, description: string) => {
//   const router = useRouter()
//   const updatedUser = await todoApi.updateUser(id, complete, name, description);
//   router.refresh();
//   console.log("Este es el usuario editado", updatedUser)
//   return updatedUser;
// }

export const NewUser = () => {
  return (
    <form className='flex flex-col w-full'>
      <div className="flex flex-col">
        <input type="text"
          className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
          placeholder="Ingrese el nuevo nombre" />

        <input type="text"
          className="w-full mb-4 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
          placeholder="Aqui ingrese su descripcion" />
      </div>
      <div className="flex gap-4 mb-4">
        <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">Editar</button>

        <button
          type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
          <IoTrashOutline />
          Delete
        </button>
      </div >

    </form>
  )
}
