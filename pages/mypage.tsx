import {useSession} from "next-auth/react";

export default function mypage() {
  const {data: session} = useSession()
  console.log(session)
  return (
    <div>dd</div>
  )
}