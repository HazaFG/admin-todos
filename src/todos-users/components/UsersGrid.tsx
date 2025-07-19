'use client'

import { users } from "@/generated/prisma"
import { UsersItem } from "./UsersItem";
import * as usersApi from "@/todos-users/helpers/users"
import { useRouter } from "next/navigation";

interface Props {
  users?: users[];
}

export const UsersGrid = ({ users = [] }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {
          users.map(user => (
            <UsersItem key={user.id} user={user} />
          ))
        }

      </div>
    </>
  )
}
