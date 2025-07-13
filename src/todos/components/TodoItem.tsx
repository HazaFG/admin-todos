import { Todo } from "@/generated/prisma";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  const todoDoneClasses = "bg-blue-50 border-blue-500 border-l-4";
  const todoPendingClasses = "bg-red-50 border-red-500 border-l-4";

  return (
    <div
      className={`py-4 px-6 rounded-lg shadow-md ${todo.complete ? todoDoneClasses : todoPendingClasses} flex flex-row justify-between items-center gap-2 sm:gap-0`}>

      <div className="flex flex-cols sm:flex-row justify-start items-center gap-4">
        <div className={`
         flex p-2 rounded-md cursor-pointer
         hover:bg-opacity-60
         bg-blue-100
        `}>
          {
            todo.complete
              ? <IoCheckboxOutline size={30} />
              : <IoSquareOutline size={30} />
          }
        </div>

        <div className="text-center sm:text-left">
          {todo.description}
        </div>
      </div>
    </div>
  )
}
