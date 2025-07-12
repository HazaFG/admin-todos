import { CiBookmarkCheck, CiLogout, } from 'react-icons/ci';
import React, { JSX } from "react";
import Link from 'next/link';

interface Props {
  title: string,
  path: string
  icon: JSX.Element
}

export const SidebarItem = ({ title, path, icon }: Props) => {
  return (
    <>
      <div>
        <ul className="space-y-2 tracking-wide mt-8">
          {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
          <li>
            <Link href={path} className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
              <div>{icon}</div>
              <span className="-mr-1 font-medium">{title}</span>
            </Link>
          </li>
        </ul>
      </div>

    </>
  )
}
