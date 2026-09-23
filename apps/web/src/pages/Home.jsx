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
            <div className="">
                <h1>{server.message}</h1>
            </div>
        </>
    )
}

export default Home;