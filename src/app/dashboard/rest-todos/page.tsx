import prisma from "@/lib/prisma"
import { TodosGrid } from "@/todos/components/TodosGrid"

export const metadata = {
  title: 'Listado de todos',
  description: 'Aqui es donde estan todos nuestros Todos',
}

export default async function RestTodosPage() {
  //Aqui vamos a precargar los todos ya que ya los tenemos en prisma, es decir, desde nuestra base de datos
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

  return (
    <>
      {/* TODO: Formulario para agregar */}
      <TodosGrid todos={todos} />
    </>
  )
}
