import {useQuery} from "@tanstack/react-query"
import { useAuth } from "../features/AuthContext"
import Icon from "../components/Icon"
import { NavLink } from "react-router-dom"

function Account(){

    const {user} = useAuth()

    return (
        <>
        <div className="p-2 flex">
            <div className="w-1/6 flex items-center justify-center">
                <Icon src={user?.data?.data?.avatar} className="w-30 h-30"/>
            </div>

            <div className="flex items-center justify-start w-full">
                <div>
                    <p className="text-2xl">
                        {user?.data?.data?.username}
                    </p>
                
                    <div>
                        <p className="text-sm">
                            {user?.data?.data?.subscriberCount} Subscribers
                        </p>
                    </div>

                    <div>
                        <p className="text-sm">
                            <NavLink to={`/${user?.data?.data?.username}/channel`}>
                                view channel
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Account