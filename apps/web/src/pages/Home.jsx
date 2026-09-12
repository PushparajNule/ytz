import { useEffect, useState } from "react"
import authApi from "../api/auth.api"

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

    return (
        <>
            <h1>{server.message}</h1>
        </>
    )
}

export default Home;