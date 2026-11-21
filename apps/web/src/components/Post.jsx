import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import postApi from "../api/post.api"
import Icon from "./Icon"
import Button from "./Button"
import subsApi from "../api/subs.api"
import { useAuth } from "../features/AuthContext"

function Post() {

    const {postId} = useParams()

    const {user} = useAuth()

    const {data : post, isLoading} = useQuery({
        queryKey : ["post", postId],

        queryFn : async () => {
            try {
                const res = await postApi.getPost(postId)
                const channelInfo = await subsApi.getChannel(res?.data?.data?.user?.username)
                const obj = {...res?.data?.data, ...channelInfo?.data?.data}
                return obj;
            } catch (error) {
                throw error
            }
        }
    })

    const queryClient = useQueryClient()

    const subscribeMutation = useMutation({
        mutationFn : subsApi.subscribe,

        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ["user"]
            })

            queryClient.invalidateQueries({
                queryKey : ["post", postId]
            })
        },

        onError : (error) => {
            error.response.data.errors
        }
    })

    if(isLoading){
        return <div>Loading Post...</div>
    }

    console.log(post)
    console.log(user)

    return (
        <>
        <div className="flex h-full">
            <div className="w-full border p-2 rounded h-full">
                <div className="border">
                    <div>
                        video
                    </div>

                    <div>
                        {post && post?.title}
                    </div>

                    <div className="flex justify-evenly mt-2">
                        <div>
                            <div>
                                <div>
                                    <Icon src={post?.user?.avatar} alt="Avatar" className="h-13 w-13" />
                                </div>

                                <div>
                                    <div>
                                        {post && post?.user?.username}
                                    </div>

                                    <div>
                                        {post && post?.subscriberCount} Subscribers
                                    </div>
                                </div>
                            </div>
                        </div>

                        {user?.id === post?.owner ? "" : post?.isSubscribed ? "Subscribed" : <Button className="h-min" onClick={() => subscribeMutation.mutate(post?.owner)} disabled={subscribeMutation.isPending}>{subscribeMutation.isPending ? "Subscribing" : "Subscribe"}</Button>}

                        <div>
                            like post
                        </div>

                        <div>
                            Dislike Post
                        </div>

                        <div>
                            share
                        </div>

                        <div>
                            save to playlist / watchlater
                        </div>
                    </div>
                </div>

                <div className="border mt-2">
                    <div className="flex">
                        <div>
                            Views
                        </div>

                        <div>
                            {post && post?.createdAt}
                        </div>
                    </div>

                    <div>
                        {post && post?.description == null ? "No Description" : post?.description}
                    </div>
                </div>
            </div>

            <div className="flex-1/2 w-full border p-2 rounded ml-1 h-full">
                <div>
                    suggested posts
                </div>
            </div>
        </div>
        </>
    )
}

export default Post