import prisma from "@/lib/prisma"
import { NewTodo } from "@/todos/components/NewTodo"
import { TodosGrid } from "@/todos/components/TodosGrid"

export const metadata = {
  title: 'Listado de todos pero actions',
  description: 'Server actions',
}

export default async function SeverTodosPage() {
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
