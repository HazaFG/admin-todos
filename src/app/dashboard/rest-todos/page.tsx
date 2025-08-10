export const dynamic = 'force-dynamic'
export const revalidate = 0

import prisma from "@/lib/prisma"
import { NewTodo } from "@/todos/components/NewTodo"
import { TodosGrid } from "@/todos/components/TodosGrid"
import { getUserSessionServer } from "@/auth/actions/auth-actions"
import { redirect } from "next/navigation"

export const metadata = {
  title: 'Listado de todos',
  description: 'Aqui es donde estan todos nuestros Todos',
}

export default async function RestTodosPage() {
  //Aqui vamos a precargar los todos ya que ya los tenemos en prisma, es decir, desde nuestra base de datos, no lo estamos haciendo desde helpers, este seria el get por asi decirlo 
  const user = await getUserSessionServer();

  if (!user) {
    redirect('/api/auth/signin')
  }

  const todos = await prisma.todo.findMany({
    //Vamos a meter esta condicion para los todos, que no se los traiga asi nomas para que solo sean los que el usuario tenga
    where: { userId: user.id },
    orderBy: { description: 'asc' }
  })

  return (
    <>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </>
  )
}
