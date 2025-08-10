import Link from 'next/link';
import Image from 'next/image'
import { SidebarItem } from './SidebarItem';
import { IoBasketOutline, IoBody, IoDesktop, IoBookSharp, IoAlbums, IoCodeWorkingOutline, IoPersonCircleOutline } from 'react-icons/io5';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { LogoutButton } from './LogoutButton';
import { redirect } from 'next/navigation';

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
    path: '/dashboard/usersTodos',
    title: 'Rest USERS',
    icon: <IoBody width={30} />
  },
  {
    path: '/dashboard/server-todos',
    title: 'Server actions',
    icon: <IoDesktop width={30} />
  },
  {
    path: '/dashboard/cookies',
    title: 'Cookies',
    icon: <IoCodeWorkingOutline width={30} />
  },
  {
    path: '/dashboard/products',
    title: 'Products',
    icon: <IoBasketOutline width={30} />
  },
  {
    path: '/dashboard/profile',
    title: 'Perfil',
    icon: <IoPersonCircleOutline width={30} />
  },
]

export const Sidebar = async () => {

  //Vamos a obtener la informacion del usuario para el sidebar, del lado del servidor, la informacion del usuario autenticado
  const session = await getServerSession(authOptions)

  //Roles
  const userRoles = session?.user?.roles ?? ['no roles']

  if (!session) {
    redirect('/api/auth/signin')
  }

  // const switchImage = () => {
  //   if (!session.user?.image) {
  //     console.log('No hay imagen')
  //   }
  //   session.user?.image
  // }

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

          <div className="mt-8 text-center filled">
            <Image
              src={(!session.user?.image) ? '/logo.svg' : session.user.id}
              alt=""
              width={45}
              height={45}
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{session.user?.name}</h5>
            <span className="hidden text-gray-400 lg:block capitalize">{userRoles.join(', ')}</span>
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
          <LogoutButton />
        </div>
      </aside>
    </>
  )
}
