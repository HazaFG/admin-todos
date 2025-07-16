'use client'

import { Todo } from "@/generated/prisma";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from 'react'

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const todoDoneClasses = "bg-blue-50 border-blue-500 border-l-4";
  const todoPendingClasses = "bg-red-50 border-red-500 border-l-4";

  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    //vamos a usar una callback
    (state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue })
  )

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete)
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
    }
  }

  return (
    <div
      /* onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)} */
      onClick={onToggleTodo}
      className={`py-4 px-6 rounded-lg shadow-md ${todoOptimistic.complete ? todoDoneClasses : todoPendingClasses} flex flex-row justify-between items-center gap-2 sm:gap-0`}>

      <div className="flex flex-cols sm:flex-row justify-start items-center gap-4">
        <div className={`
         flex p-2 rounded-md cursor-pointer
         hover:bg-opacity-60
         bg-blue-100
        `}>
          {
            todoOptimistic.complete
              ? <IoCheckboxOutline size={30} />
              : <IoSquareOutline size={30} />
          }
        </div>

        <div className="text-center sm:text-left">
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  )
}
