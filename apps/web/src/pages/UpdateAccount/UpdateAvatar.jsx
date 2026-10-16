import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../../features/AuthContext"
import { useForm } from "react-hook-form"
import authApi from "../../api/auth.api"
import Icon from "../../components/Icon"
import { Button, Input } from "../../components"

function UpdateAvatar() {

    const {user} = useAuth()

    const {register, handleSubmit} = useForm()

    const queryClient = useQueryClient()

    const avatarMutation = useMutation({
        mutationFn : authApi.updateAvatar,

        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ["user"]
            })
        },

        onError : (error) => {
            error.response.data.errors
        }
    })

    const submitAvatar = async (data) => {
        const formData = new FormData()

        if(data.avatar[0] !== undefined){
            formData.append("avatar", data.avatar[0])
        }

        avatarMutation.mutate(formData)
    }

    return (
        <>
        <div className="p-2">
            <div className="flex justify-center items-center">
                <Icon src={user?.data?.data?.avatar} className="w-60 h-60 rounded-xl"/>
            </div>

            <div className="p-1 m-2">
                <form onSubmit={handleSubmit(submitAvatar)}>
                    <Input type="file" {...register("avatar")} accept="image/*" label="Choose New Avatar" className="border hover:cursor-pointer"/>
                    <Button className="border rounded p-1 mt-1">{avatarMutation.isPending ? "Updating..." : "Update"}</Button>
                </form>

                {avatarMutation.isError && <div>
                        <p className='border p-2 rounded'>{avatarMutation.error.response.data.message}</p>
                    </div>}

                {avatarMutation.isSuccess && <div>
                        <p>Account Updated Successfully</p>
                    </div>}
            </div>
        </div>
        </>
    )
}

export default UpdateAvatar