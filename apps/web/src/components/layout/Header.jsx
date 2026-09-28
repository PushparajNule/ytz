import { NavLink } from "react-router-dom";
import Button from "../Button";
import Icon from "../Icon";
import Logo from "../Logo";
import SearchBar from "../SearchBar";
import { useQuery } from "@tanstack/react-query";

function Header(){

    const {data : user} = useQuery({
        queryKey : ["user"],
        queryFn : async () => {
            const user = await authApi.currentUser()
            return user;
        },
        staleTime : (1000 * 60) * 30
    })

    return (
        <>
            <div className="flex p-2 justify-between border">
                <div>
                    <Logo/>
                </div>

                <div className="flex w-[70%] justify-around">
                    <div>
                        <SearchBar/>
                    </div>

                    <div>
                        <Button/>
                    </div>

                    <div>
                        {user && <Icon/>}
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
        </>
    )
}

export default Header;