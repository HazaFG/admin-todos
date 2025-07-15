import prisma from "@/lib/prisma"
import { UsersGrid } from "@/todos-users/components/UsersGrid"

export const metadata = {
  title: 'Listado de usuarios',
  description: 'Aqui es donde estan los usuraios',
}

export default async function usersPage() {
  const users = await prisma.users.findMany()

  return (
    <>
      <h1>HOla, soy la usersPage</h1>
      {
        <UsersGrid users={users} />
      }
    </>
  )
}
