'use client'

import { Todo } from "@/generated/prisma";
import { TodoItem } from "./TodoItem";
import { toggleTodo } from "../actions/todo-actions";

interface Props {
  //aqui me puedo traer el tipo Todo coomo arreglooo, y ya me tiene todos lo datos de la base de datoooos 
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  //Estos todos ya estan del lado del clienteeeee, omg omg
  // console.log(todos)

  // const router = useRouter();
  //

  // const toggleTodo = async (id: string, complete: boolean) => {
  //   const updatedTodo = await todoApi.updateTodo(id, complete)
  //   router.refresh();
  //   console.log(updatedTodo)
  //   return updatedTodo;
  // }
  // no va a ser necesario crear esta funcion
  // const onToggleTodo = 

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {
          todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
          ))
        }
      </div>
    </>
  )
} 
