import { users } from "@/generated/prisma"
import { ImOnedrive } from "react-icons/im";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

interface Props {
  user: users;
}

export const UsersItem = ({ user }: Props) => {
  return (
    <div
      className={`py-4 px-6 rounded-lg shadow-md flex flex-row justify-between items-center gap-2 sm:gap-0`}>

      <div className="flex flex-cols sm:flex-row justify-start items-center gap-4">
        <div className={`
         flex p-2 rounded-md cursor-pointer
         hover:bg-opacity-60
         bg-blue-100
        `}>
          {
            user.complete ? <IoCheckmarkDoneCircle size={30} /> : <ImOnedrive></ImOnedrive>
          }
        </div>

        <div className="text-center sm:text-left">
          {user.name}
        </div>
        <div className="text-center sm:text-left">
          {user.description}
        </div>
      </div>
    </div>
  )
}
