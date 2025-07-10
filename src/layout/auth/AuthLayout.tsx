import { Outlet } from "react-router-dom";



const AuthLayout = () => {
   
  return (
    <div className="min-h-screen bg-secondary w-full flex justify-center items-center">
      <Outlet/>
    </div>
  )
}

export default AuthLayout
