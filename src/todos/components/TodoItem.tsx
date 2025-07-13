import { Todo } from "@/generated/prisma";

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  return (
    <div>{todo.description}</div>
  )
}
