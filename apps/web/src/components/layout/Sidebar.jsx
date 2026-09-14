import { NavLink } from "react-router-dom";

function Sidebar(){

    return (
        <>
            <h1>Sidebar</h1>
            <div className="">

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
                    <NavLink to={"/accounts"}> Account </NavLink>
                </div>

                <div>
                    <NavLink to={"/settings"}> Settings </NavLink>
                </div>

            </div>
        </>
    )
}

export default Sidebar;