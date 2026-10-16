import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../../features/AuthContext"
import authApi from "../../api/auth.api"
import { useForm } from "react-hook-form"
import { Button, Input } from "../../components"
import { useState } from "react"

function UpdatePassword() {

    const [showPass, setShowPass] = useState(false)

    const queryClient = useQueryClient()

    const {register, handleSubmit} = useForm()

    const passwordMutation = useMutation({
        mutationFn : authApi.changePassword,

        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ["user"]
            })
        },

        onError : (error) => {
            error.response.data.errors
        }
    })
    
    const submitPassword = async (data) => {

        const payload = {}

        if(data.newPassword !== undefined && data.oldPassword !== undefined){
            payload.newPassword = data.newPassword
            payload.oldPassword = data.oldPassword
        }

        passwordMutation.mutate(payload)
    }

    return (
        <>
        <div className="border p-2 rounded w-min">
            <div>
                <form onSubmit={handleSubmit(submitPassword)}>
                    <Input type={showPass ? "text" : "password"} {...register("oldPassword")} label="Enter Your Old Password" placeholder="oldPassword" className="border"/>
                    <Input type={showPass ? "text" : "password"} {...register("newPassword")} label="Enter Your New Password" placeholder="newPassword" className="border"/>
                    <div className="flex h-min w-max">
                        <Button className="border p-2 rounded mt-1" disabled={passwordMutation.isPending}>{passwordMutation.isPending ? "Updating..." : "Update"}</Button>
                        <Button type="button" onClick={() => {setShowPass(!showPass)}} className="border p-2 rounded mt-1 ml-2">{showPass ? "Hide Password" : "Show Password"}</Button>
                    </div>
                </form>

                {passwordMutation.isError && <div>
                        <p className='border p-2 rounded'>{passwordMutation.error.response.data.message}</p>
                    </div>}

                {passwordMutation.isSuccess && <div>
                        <p>Account Updated Successfully</p>
                    </div>}
            </div>
        </div>
        </>
    )
}

export default UpdatePassword