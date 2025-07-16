import Link from 'next/link';
import Image from 'next/image'
import { CiLogout, } from 'react-icons/ci';
import { SidebarItem } from './SidebarItem';
import { IoBody, IoDesktop, IoBookSharp, IoAlbums } from 'react-icons/io5';

const menuItems = [
  {
    path: '/dashboard ',
    title: 'Dashboard',
    icon: <IoAlbums width={30} />
  },
  {
    path: '/dashboard/rest-todos',
    title: 'Rest TODOS',
    icon: <IoBookSharp width={30} />
  },
  {
    path: '/dashboard/users',
    title: 'Rest USERS',
    icon: <IoBody width={30} />
  },
  {
    path: '/dashboard/server-todos',
    title: 'Server actions',
    icon: <IoDesktop width={30} />
  },
]

export const Sidebar = () => {
  return (
    <>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] border border-gray-200 ">
        <div>
          <div className="-mx-6 px-6 py-4">
            {/* TODO: Next/Link hacia dashboard */}
            <Link href="/dashboard" title="home">
              {/* Next/Image */}
              <Image src="/logo.svg" width={299} height={59} className="w-32" alt="tailus logo" />
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Image
              src="/Gigachad.webp"
              alt=""
              width={45}
              height={45}
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Hazael Flores</h5>
            <span className="hidden text-gray-400 lg:block">Admin</span>
          </div>

          {
            menuItems.map(item => (
              <SidebarItem
                key={item.path}
                title={item.title}
                path={item.path}
                icon={item.icon}
              />
            ))
          }
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiLogout />
            <span className="group-hover:text-gray-700">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
