import { NavLink } from "react-router-dom";
import Button from "../Button";
import Icon from "../Icon";
import Logo from "../Logo";
import SearchBar from "../SearchBar";


function Header(){

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
                        {/* Check if user is logged in : if logged in icon else signup*/}
                        <Icon/>
                            <NavLink to={"/signup"}>
                                SignUp
                            </NavLink>

                            <NavLink to={"/login"}>
                                Login
                            </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;