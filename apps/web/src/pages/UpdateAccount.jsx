import { NavLink, Outlet } from "react-router-dom"

function UpdateAccount() {

    return (
    <>
    <div className="flex h-full w-full">
        <div className="border w-max h-full p-2 rounded">
            <NavLink to={`/settings/update-account/update-account-details`}>
                <div>
                    Update Account Details
                </div>
            </NavLink>

            <NavLink to={`/settings/update-account/update-email`}>
                <div>
                    Update Email
                </div>
            </NavLink>

            <NavLink to={`/settings/update-account/update-password`}>
                <div>
                    Update Password
                </div>
            </NavLink>

            <NavLink to={`/settings/update-account/update-avatar`}>
                <div>
                    Update Avatar
                </div>
            </NavLink>

            <NavLink to={`/settings/update-account/update-coverImage`}>
                <div>
                    Update Cover Image
                </div>
            </NavLink>

            <NavLink to={`/settings/update-account/logout`}>
                <div>
                    Logout
                </div>
            </NavLink>
        </div>

        <div className="w-full">
            <div className="flex justify-center items-center h-full">
                <Outlet/>
            </div>
        </div>
    </div>
    </>
    )
}

export default UpdateAccount