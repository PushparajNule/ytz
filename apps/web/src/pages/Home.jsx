import { useEffect, useState } from "react"
import authApi from "../api/auth.api"
import { useQuery } from "@tanstack/react-query"

function Home(){

    const [server, setServer] = useState("Offline")
    useEffect(() => {

        const health = async () => {
            try {
                const response = await authApi.health()

                setServer(response?.data)
            } catch (error) {
                console.log(error)
            }
        }

        health()
    }, [])

    const {data : user} = useQuery({
        queryKey : ["user"],
        queryFn : async () => {
            const user = await authApi.currentUser()
            return user;
        },
        staleTime : (1000 * 60) * 15
    })


    return (
        <>
            <div className="">
                {user && <h1>Welcome Back!!! {user.data.data.username}</h1>}
                <h1>{server.message}</h1>
            </div>
        </>
    )
}

export default Home;