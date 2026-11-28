import { useAuth } from "../features/AuthContext"
import Icon from "../components/Icon"
import { NavLink } from "react-router"

function Account(){

    const {user} = useAuth()

    return (
        <>
        <div className="p-2 flex">
            <div className="w-1/12 flex items-center justify-center mr-6">
                <Icon src={user?.avatar} className="w-30 h-30"/>
            </div>

            <div className="flex items-center justify-start w-full">
                <div>
                    <p className="text-2xl">
                        {user?.username}
                    </p>
                
                    <div>
                        <p className="text-sm">
                            {user?.subscriberCount} Subscribers
                        </p>
                    </div>

                    <div>
                        <p className="text-sm">
                            <NavLink to={`/${user?.username}/channel`}>
                                view channel
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-2">
            <div>
                <div>
                    History
                </div>

                <div>
                    posts
                </div>
            </div>

            <div>
                <div>
                    Playlists
                </div>

                <div>
                    posts
                </div>
            </div>

            <div>
                <div>
                    Watch Later
                </div>

                <div>
                    posts
                </div>
            </div>

            <div>
                <div>
                    Liked Posts
                </div>

                <div>
                    posts
                </div>
            </div>
        </div>
        </>
    )
}

export default Account