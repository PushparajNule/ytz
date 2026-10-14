import { NavLink } from "react-router-dom"
import Icon from "../components/Icon"
import { useAuth } from "../features/AuthContext"

function Subscription(){

    const {user} = useAuth()

    const subscriptions = user?.data?.data?.subscribedTo

    return (
        <>
        <div className="flex border p-2 rounded">
            {user && subscriptions?.map((channel) => (
                <NavLink to={`/${channel?.channel?.username}/channel`} key={channel?.channelId}>
                    <div className="pl-4">
                        <div className="">
                            <Icon src={channel?.channel?.avatar} className="w-20 h-20"/>
                        </div>

                        <div className="flex justify-center">
                            {channel?.channel?.username}
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>

        <div className="border h-min p-2 mt-1 rounded">
            videos
        </div>
        </>
    )
}

export default Subscription