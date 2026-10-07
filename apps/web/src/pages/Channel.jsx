import { useAuth } from "../features/AuthContext"
import { NavLink, Outlet } from "react-router-dom"

function Channel() {

    const {user} = useAuth()
    
    return (
        <div>
            <div>
                thumbnail
            </div>

            <div>
                info
            </div>

            <div>
                <NavLink to={`/:${user?.data?.data?.username}/channel/playlists`}>
                    playlists /
                </NavLink>

                <NavLink to={`/:${user?.data?.data?.username}/channel/my-posts`}>
                    my posts /
                </NavLink>
                
                <NavLink to={`/:${user?.data?.data?.username}/channel/liked-posts`}>
                    liked posts
                </NavLink>
            </div>

            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default Channel