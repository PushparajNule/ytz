import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "../features/AuthContext"
import postApi from "../api/post.api"
import { useForm } from "react-hook-form"
import { Input, Button } from "../components"
import { useNavigate } from "react-router"

function CreatePost(){

    const {user} = useAuth()

    const navigate = useNavigate()

    const {register, handleSubmit} = useForm({defaultValues : {
        status : "PUBLIC"
    }})

    const queryClient = useQueryClient()

    const postMutation = useMutation({
        mutationFn : postApi.createPost,

        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ["posts"]
            })

            navigate("/")
        },

        onError : (error) => {
            error.response.data.errors
        }
    })

    const submitPost = async (data) => {

        const formData = new FormData()

        formData.append("title", data.title)
        formData.append("status", data.status)
        formData.append("video", data.video[0])

        if(data.description !== undefined && data.description !== ""){
            formData.append("description", data.description)
        }

        if(data.thumbnail[0] !== undefined){
            formData.append("thumbnail", data.thumbnail[0])
        }

        postMutation.mutate(formData)
    }

    return (
        <>
        <div>
            <form onSubmit={handleSubmit(submitPost)}>
                <Input {...register("video")} type="file" accept="video/*" error={postMutation.error} label="Select File To Post : " className="border p-1"/>
                <Input {...register("thumbnail")} type="file" accept="image/*" error={postMutation.error} label="Select Thumbnail For Post : " required={false} className="border p-1"/>

                <Input {...register("title")} type="text" error={postMutation.error} label="Title Of The Post : " className="border"/>
                <Input {...register("description")} type="text" error={postMutation.error} label="Description Of The Post : " required={false} className="border"/>
                <div>
                    <label>Status Of The Post : </label>
                    <div>
                        <input {...register("status")} type="radio" value="PUBLIC" error={postMutation.error} className="border p-1 mr-2"/>
                        <label>PUBLIC</label>
                    </div>
                    
                    <div>
                        <input {...register("status")} type="radio" value="PRIVATE" error={postMutation.error} className="border p-1 mr-2"/>
                        <label>PRIVATE</label>
                    </div>
                </div>
                <Button type="submit" disabled={postMutation.isPending} className="p-0.5 mt-2 border rounded">{postMutation.isPending ? "Publishing..." : "Publish"}</Button>
            </form>
        </div>
        </>
    )
}

export default CreatePost