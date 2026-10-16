import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import authApi from "../../api/auth.api"
import { Button, Input } from "../../components"
import { useQuery } from "@tanstack/react-query"

function UpdateEmail() {

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: authApi.currentUser,
        refetchOnWindowFocus: true,
    })

    const {register, handleSubmit} = useForm()

    const queryClient = useQueryClient()

    const emailMutation = useMutation({
        mutationFn : authApi.changeEmail,

        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ["user"]
            })
        },

        onError : (error) => {
            error.response.data.errors
        }
    })

    const submitEmail = async (data) => {
        const payload = {}

        if(data.newEmail !== undefined){
            payload.newEmail = data.newEmail
        }

        emailMutation.mutate(payload)
    }

    return (
        <>
        <div className="border p-2 rounded w-min mt-2">
            <div>
                <form onSubmit={handleSubmit(submitEmail)}>
                    <div>
                        <Input {...register("newEmail")} label="Change Email : " placeholder={user?.data?.data?.email} className="border"/>
                    </div>

                    <div>
                        <Button type="submit" className="border p-0.5 rounded mt-1" disabled={emailMutation.isPending}>{emailMutation.isPending ? "Updating..." : "Update"}</Button>
                    </div>

                    {emailMutation.isError && <div>
                        <p className='border p-2 rounded'>{emailMutation.error.response.data.message}</p>
                    </div>}

                {emailMutation.isSuccess && <div>
                        <p>Check Your Mail Inbox To Verify New Email</p>
                    </div>}
                </form>
            </div>
        </div>
        </>
    )
}

export default UpdateEmail