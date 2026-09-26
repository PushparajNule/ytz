import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import { Button, Input } from "../components"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import authApi from "../api/auth.api"

function Login() {

    const {register, handleSubmit} = useForm()

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const loginMutation = useMutation({
        mutationFn : authApi.login,

        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ['user']
            })

            navigate("/")
        },

        onError : (error) => {
            console.log(error)
        }
    })

    const onSubmit = async (data) => {

        const payload = {
            password : data.password
        }

        if(data.identifier.includes('@')){
            payload.email = data.identifier
        } else {
            payload.username = data.identifier
        }

        loginMutation.mutate(payload)
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
                    <Input {...register("identifier")} label="username or email : " placeholder="username or email" className="border"/>
                    <Input {...register("password")} label="password : " placeholder="password" className="border"/>

                    <Button type="submit" className="border" disabled={loginMutation.isPending} >{loginMutation.isPending ? "Logging In..." : "Login"}</Button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login