import { useQuery } from "@tanstack/react-query";
import subsApi from "../api/subs.api";
import Icon from "../components/Icon"
import { NavLink, Outlet, useParams } from "react-router-dom"
import { useAuth } from "../features/AuthContext.jsx";

function Channel() {

    const {user : loggedUser} = useAuth()

    const {username} = useParams()

    const isOwner = loggedUser?.data?.data?.username == username

    const {data : user} = useQuery({
        queryKey : ["channel", username],
        queryFn : async () => await subsApi.getChannel(username)
    })

    return (
        <div>
            {user?.data?.data?.coverImage && <div className="w-full h-60">
                <Icon src={user?.data?.data?.coverImage} alt="CoverImage" className="w-full h-full rounded-xl" />
            </div>}

            <div className="flex mt-4">
                <div className="flex w-1/4 justify-center">
                    <Icon src={user?.data?.data?.avatar} className="w-50 h-50"/>
                </div>

                <div className="w-full">
                    <div className="w-full text-6xl">
                        {user?.data?.data?.username}
                    </div>

                    <div className="w-full">
                        {user?.data?.data?.subscriberCount} Subscribers
                    </div>

                    <div className="w-full">
                        {user?.data?.data?.description || "No Description"}
                    </div>
                </div>
            </div>

            <div className="mt-4 pb-4 border-b">
                <NavLink to={`/${user?.data?.data?.username}/channel/playlists`} className={`pr-4`}>
                    PlayLists
                </NavLink>

                <NavLink to={`/${user?.data?.data?.username}/channel/my-posts`} className={`pr-4`}>
                    Posts
                </NavLink>

                {isOwner && <NavLink to={`/${user?.data?.data?.username}/channel/liked-posts`} className={`pr-4`}>
                    Liked Posts
                    </NavLink>}

                {isOwner && <NavLink to={`/settings/update-account`}>
                    Edit Channel
                    </NavLink>}
            </div>

            <div className="mt-4">
                <Outlet/>
            </div>
        </div>
    )
}

export default Channel;