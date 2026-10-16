import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../../features/AuthContext"
import { useForm } from "react-hook-form"
import authApi from "../../api/auth.api"
import Icon from "../../components/Icon"
import { Button, Input } from "../../components"

function UpdateCoverImage() {

    const {user} = useAuth()

    const {register, handleSubmit} = useForm()

    const queryClient = useQueryClient()

    const coverImageMutation = useMutation({
        mutationFn : authApi.updateCoverImage,

        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ["user"]
            })
        },

        onError : (error) => {
            error.response.data.errors
        }
    })

    const submitCoverImage = async (data) => {
        const formData = new FormData()

        if(data.coverImage[0] !== undefined){
            formData.append("coverImage", data.coverImage[0])
        }

        coverImageMutation.mutate(formData)
    }

    return (
        <>
        <div className="p-2">
            <div className="flex justify-center items-center">
                <Icon src={user?.data?.data?.coverImage} className="w-100 h-60 rounded-xl"/>
            </div>

            <div className="p-1 m-2">
                <form onSubmit={handleSubmit(submitCoverImage)}>
                    <Input type="file" {...register("coverImage")} accept="image/*" label="Choose New CoverImage" className="border hover:cursor-pointer"/>
                    <Button className="border rounded p-1 mt-1">{coverImageMutation.isPending ? "Updating..." : "Update"}</Button>
                </form>

                {coverImageMutation.isError && <div>
                        <p className='border p-2 rounded'>{coverImageMutation.error.response.data.message}</p>
                    </div>}

                {coverImageMutation.isSuccess && <div>
                        <p>Account Updated Successfully</p>
                    </div>}
            </div>
        </div>
        </>
    )
}

export default UpdateCoverImage