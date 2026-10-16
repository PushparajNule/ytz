import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useAuth } from "../../features/AuthContext"
import { useMutation } from "@tanstack/react-query"
import authApi from "../../api/auth.api"
import { Button, Input } from "../../components"

function UpdateAccountDetails() {

    const {user} = useAuth()

    const {register, handleSubmit} = useForm()

    const queryClient = useQueryClient()

    const accountDetailsMutation = useMutation({
        mutationFn : authApi.updateAccountDetails,

        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ["user"]
            })
        },

        onError : (error) => {
            error.response.data.errors
        }
    })

    const submitAccountDetails = async (data) => {

        const payload = {}

        if(data.username !== undefined && data.username !== ""){
            payload.username = data.username
        }

        if(data.description !==  undefined && data.description !== ""){
            payload.description = data.description
        }

        accountDetailsMutation.mutate(payload)
    }
    
    return (
        <>
        <div className="border p-2 rounded w-min">
            <div className="">
                <form onSubmit={handleSubmit(submitAccountDetails)}>
                    <div>
                        <Input {...register("username")} label="Change Username : " placeholder={user?.data?.data?.username} className="border" required={false}/>
                        <Input {...register("description")} label="Change Description : " placeholder={user?.data?.data?.description || "Description"} className="border" required={false}/>
                    </div>

                    <div>
                        <Button type="submit" className="border p-0.5 rounded mt-1" disabled={accountDetailsMutation.isPending}>{accountDetailsMutation.isPending ? "Updating..." : "Update"}</Button>
                    </div>
                </form>

                {accountDetailsMutation.isError && <div>
                        <p className='border p-2 rounded'>{accountDetailsMutation.error.response.data.message}</p>
                    </div>}

                {accountDetailsMutation.isSuccess && <div>
                        <p>Account Updated Successfully</p>
                    </div>}
            </div>
        </div>
        </>
    )
}

export default UpdateAccountDetails