import { WidgetItem } from "@/components/WidgetItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  // Si no hay sesion del usuario, pues redirige ahi xd
  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <>
      {/* <h1>HOla, sou un h</h1> */}
      <div className="grid gap-6 grid-cols-1 grid-cols-1 sm:grid-cols-2">
        <WidgetItem title="Usuario Conectado Server Side">
          <div className="flex flex-col">
            <span> {session.user?.name}</span>
            <span> {session.user?.image}</span>
            <span> {session.user?.email}</span>
          </div>
        </WidgetItem>
      </div>
    </>
  )
} 
