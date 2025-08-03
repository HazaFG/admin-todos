'use client'
import { useSession } from "next-auth/react"
import { useEffect } from "react"

//Se me hace raro poner un use client en una page

export default function ProfilePage() {

  const { data: session } = useSession()
  useEffect(() => {
    console.log('client side')
  }, [])

  return (
    <>
      <h1>Hola, soy la profile page</h1>
      <hr />
      <div className="flex flex-col">
        <span>{session?.user?.name ?? 'No name'}</span>
        <span>{session?.user?.email ?? 'No email'}</span>
        <span>{session?.user?.image ?? 'No image'}</span>
      </div>
    </>
  )
}

