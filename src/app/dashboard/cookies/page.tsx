import { cookies } from 'next/headers'
import { TabBar } from "@/components/TabBar"

export const metadata = {
  title: 'Cookies Page',
  description: 'Esta es la cookies page'
}

export default async function CookiesPage() {

  const cookieStore = await cookies()
  const cookieTab = cookieStore.get('SelectedTab')?.value ?? '1';

  return (
    <>
      <div className="grid grid-cols-1 sm: grid-cols-2 gap-3">
        <div className="flex flex-col ">
          <span className="text-3xl">Tabs</span>
          <TabBar currentTab={+cookieTab} />
        </div>
      </div>
    </>
  )
}

