import prisma from "@/lib/prisma"

export const metadata = {
  title: 'Listado de todos',
  description: 'SEO title',
}

export default async function RestTodosPage() {
  //Aqui vamos a precargar los todos ya que ya los tenemos en prisma, es decir, desde nuestra base de datos
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

  return (
    <>
      <h1>HOla, soy la rest-todos page</h1>
      {
        JSON.stringify(todos)
      }
    </>
  )
}
