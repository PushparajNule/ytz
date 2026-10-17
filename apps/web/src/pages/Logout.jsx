import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "../components"
import { useAuth } from "../features/AuthContext"
import authApi from "../api/auth.api"
import { useNavigate } from "react-router-dom"

function Logout(){

    const {user} = useAuth()

    const navigate = useNavigate()

    const queryClient  = useQueryClient()

    const logoutMutation = useMutation({
        mutationFn : authApi.logout,

        onSuccess : () => {
            queryClient.setQueryData(["user"], null)

            navigate(`/`, {replace : true})
        }
    })
    
    return (
        <>
        <div className="border p-2 rounded">
            <div className="m-2">
                {user?.data?.data?.username}, Are You Sure You Want To Logout???
            </div>

            <div className="flex justify-between m-2">
                <Button className="border p-1 rounded" onClick={() => {logoutMutation.mutate()}} disabled={logoutMutation.isPending}>{logoutMutation.isPending ? "Logging Out..." : "Yes, Logout"}</Button>
                <Button className="border p-1 rounded" onClick={() => {navigate(`/login`)}} disabled={logoutMutation.isPending}>Use Another Account</Button>
                <Button className="border p-1 rounded" onClick={() => {navigate(`/`)}} disabled={logoutMutation.isPending}>No</Button>
            </div>
        </div>
        </>
    )
}

export default Logout