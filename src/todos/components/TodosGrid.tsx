'use client'

import { Todo } from "@/generated/prisma";
import { TodoItem } from "./TodoItem";

import * as api from '@/todos/helpers/todos'

interface Props {
  //aqui me puedo traer el tipo Todo coomo arreglooo, y ya me tiene todos lo datos de la base de datoooos 
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  //Estos todos ya estan del lado del clienteeeee, omg omg
  // console.log(todos)
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {
          todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} toggleTodo={api.updateTodo} />
          ))
        }
      </div>
    </>
  )
} 
