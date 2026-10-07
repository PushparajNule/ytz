import { NavLink } from "react-router-dom";
import { useAuth } from "../../features/AuthContext";

function Sidebar(){

    const {user} = useAuth()

    return (
        <>
            <div className="border w-min h-full p-2">
                <div>
                    <NavLink to={"/"}> Home </NavLink> 
                </div>

                <div>
                    <NavLink to={"/subscriptions"}> Subscriptions </NavLink>
                </div>

                <div>
                    <NavLink to={"/playlists"}> Playlists </NavLink>
                </div>

                <div>
                    <NavLink to={`/:${user?.data?.data?.username}/account`}> Account </NavLink>
                </div>

                <div>
                    <NavLink to={"/settings"}> Settings </NavLink>
                </div>
            </div>
        </>
    )
}

export default Sidebar;