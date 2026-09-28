import {useForm} from 'react-hook-form'
import { Button, Input } from '../components'
import { NavLink, useNavigate } from 'react-router-dom'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import authApi from '../api/auth.api'

function Signup() {

    const {register, handleSubmit} = useForm()

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const signupMutation = useMutation({
        mutationFn : authApi.signup,

        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ["user"]
            })

            navigate("/")
        },

        onError : (error) => {
            error.response.data.errors
        }
    })

    const onSubmit = async (data) => {

        const formData = new FormData()

        formData.append("username", data.username)
        formData.append("email", data.email)
        formData.append("password", data.password)
        
        if(data.avatar[0] !== undefined){
            formData.append("avatar", data.avatar[0])
        }

        if(data.coverImage[0] !== undefined){
            formData.append("coverImage", data.coverImage[0])
        }

        signupMutation.mutate(formData)
    }

    return (
        <>
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>Account Exists?</h2>
                <NavLink to={"/login"} className={`underline`}>SignIn Here...</NavLink>
            </div>

            <div className='border w-min p-4 mt-2'>
                <Input {...register("username")} error={errors} label="username : " placeholder="username" className="border" />

                <Input {...register("email")} label="email : " placeholder="email" className="border"/>

                <Input {...register("password")} label="password : " placeholder="password" className="border"/>

                <Input {...register("avatar")} type="file" accept="image/*" label="avatar : " required={false} className="border"/>

                <Input {...register("coverImage")} type="file" accept="image/*" label="coverImage : " className="border" required={false}/>

                <Button type="submit" className="border" disabled={signupMutation.isPending}>{signupMutation.isPending ? "Registering..." : "Signup"}</Button>

                {signupMutation.isError && <div>
                    <p className='border p-2 rounded'>{signupMutation.error.response.data.errors}</p>
                </div>}
            </div>

        </form>
        </div>
        </>
    )
}

export default Signup