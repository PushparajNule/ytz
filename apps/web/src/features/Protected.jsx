import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./AuthContext"

function Protected(){

    const {user, isLoading, isError} = useAuth()

    if(isLoading){
        return (<div>Loading...</div>)
    }

    if(isError){
        return (<div>Authentication Failed Try Again Or Login Again</div>)
    }

    if(!user){
        return <Navigate to={`/login`}/>
    }

    return (
        <>
        <Outlet/>
        </>
    )
}

export default Protected