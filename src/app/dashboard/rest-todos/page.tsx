export const dynamic = 'force-dynamic'
export const revalidate = 0

import prisma from "@/lib/prisma"
import { NewTodo } from "@/todos/components/NewTodo"
import { TodosGrid } from "@/todos/components/TodosGrid"

export const metadata = {
  title: 'Listado de todos',
  description: 'Aqui es donde estan todos nuestros Todos',
}

export default async function RestTodosPage() {
  //Aqui vamos a precargar los todos ya que ya los tenemos en prisma, es decir, desde nuestra base de datos, no lo estamos haciendo desde helpers, este seria el get por asi decirlo 
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

  return (
    <>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </>
  )
}
