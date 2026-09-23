import { useForm } from "react-hook-form"
import { NavLink } from "react-router-dom"
import { Button, Input } from "../components"

function Login() {

    const {register, handleSubmit, formState = {errors}} = useForm()

    const onSubmit = async (data) => {

        const payload = {
            password : data.password
        }

        if(data.identifier.includes('@')){
            payload.email = data.identifier
        } else {
            payload.username = data.identifier
        }

        console.log(payload)
    }
    return (
        <>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2>New User?</h2>
                    <NavLink to={"/signup"} className={`underline`}>Register Here...</NavLink>
                </div>

                <div className="border p-3 w-min">
                    <Input {...register("identifier")} label="username or email" placeholder="username or email" className="border"/>
                    <Input {...register("password")} label="password" placeholder="password" className="border"/>

                    <Button type="submit" className="border" >Login</Button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login