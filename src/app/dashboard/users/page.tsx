import prisma from "@/lib/prisma"
import { NewUser } from "@/todos-users/components/NewUser"
import { UsersGrid } from "@/todos-users/components/UsersGrid"

export const metadata = {
  title: 'Listado de usuarios',
  description: 'Aqui es donde estan los usuraios',
}

export default async function usersPage() {
  //Hacemos el primero de todos, el cual es el get, y es el unico que va a figuar aqui, el resto los manejaremos en el helper.ts
  const users = await prisma.usersTodos.findMany()

  return (
    <>
      <div className="ml-10 mb-4">
        <NewUser />
      </div>
      {
        <UsersGrid users={users} />
      }
    </>
  )
}
