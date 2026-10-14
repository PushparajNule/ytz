import { NavLink } from "react-router-dom";
import Button from "../Button";
import Icon from "../Icon";
import Logo from "../Logo";
import SearchBar from "../SearchBar";
import { useAuth } from "../../features/AuthContext.jsx";

function Header(){

    const {user} = useAuth()

    return (
        <>
            <div className="flex p-2 justify-between border">
                <div>
                    <Logo/>
                </div>

                <div className="flex w-[50%] justify-between">
                    <div className="">
                        <div className="">
                            <SearchBar/>
                        </div>
                    </div>

                    <div className="flex w-[20%] justify-between">
                        <div className="">
                            <NavLink to={"/createPost"}>
                                <Button> + Create</Button>
                            </NavLink>
                        </div>

                        <div>
                            <NavLink to={`/${user?.data?.data?.username}/account`}>
                                {user && <Icon src={user?.data?.data?.avatar} className="w-10 h-10"/>}
                            </NavLink>
                            {!user && <div>
                                    <NavLink to={"/signup"}>
                                        SignUp
                                    </NavLink>
                                    /
                                    <NavLink to={"/login"}>
                                        Login
                                    </NavLink>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;