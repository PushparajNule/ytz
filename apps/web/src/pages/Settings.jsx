import { NavLink, Outlet } from "react-router-dom"

function Settings() {
    return (
    <div className="flex h-full w-full">
        <div className="border w-max h-full p-2 rounded">
            <NavLink to={`/settings/update-account`}>
                <div>
                    Account
                </div>
            </NavLink>

            <NavLink to={`/settings/appearance`}>
                <div>
                    Appearence
                </div>
            </NavLink>

            <NavLink to={`/settings/delete-account`}>
                <div>
                    Delete Account
                </div>
            </NavLink>

            <div>
                Terms and Conditions
            </div>

            <div>
                Privacy and Policy
            </div>

            <div>
                Help
            </div>

            <div>
                About Us
            </div>

            <div>
                Contact Us
            </div>
        </div>

        <div className="w-full">
            <div className="ml-1 rounded w-full h-full">
                <Outlet/>
            </div>
        </div>
    </div>)
}

export default Settings