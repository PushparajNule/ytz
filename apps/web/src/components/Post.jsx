import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"
import postApi from "../api/post.api"
import Icon from "./Icon"
import Button from "./Button"
import subsApi from "../api/subs.api"
import { useAuth } from "../features/AuthContext"
import ShareBtn from "./ShareBtn"
import VideoPlayer from "./VideoPlayer"
import { useEffect, useRef, useState } from "react"

function Post() {

    const {postId} = useParams()

    const {user} = useAuth()

    const {data : post, isLoading, isSuccess} = useQuery({
        queryKey : ["post", postId],

        queryFn : async () => {
            try {
                const res = await postApi.getPost(postId)
                return res?.data?.data;
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

    const unsubscribeMutation = useMutation({
        mutationFn : subsApi.unsubscribe,

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

    const likeMutation = useMutation({
        mutationFn : postApi.likePost,

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

    const dislikeMutation = useMutation({
        mutationFn : postApi.dislikePost,

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

    const unlikeMutation = useMutation({
        mutationFn : postApi.unlikePost,

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

    const undislikeMutation = useMutation({
        mutationFn : postApi.undislikePost,

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

    const [video, setVideo] = useState()

    const {data : progress, isFetched : progressFetched, isLoading : progressLoading} = useQuery({
        queryKey : ["progress", postId],

        queryFn : async () => {
            try {
                const res = await postApi.getPostWatchHistory(postId);
                return res?.data?.data;
            } catch (error) {
                throw error;
            }
        }
    })

    const createProgressMutation = useMutation({
        mutationFn : postApi.createWatchHistory,

        onError : (error) => {
            error.response.data.errors
        }
    })

    const saveProgressMutation = useMutation({
        mutationFn : postApi.updateWatchHistory,

        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ["progress", postId]
            })
        },

        onError : (error) => {
            error.response.data.errors
        }
    })

    useEffect(() => {
        try {
            if(progressFetched == true && progress == null){
                createProgressMutation.mutateAsync(postId);
            } else {
                return;
            }
        } catch (error) {
            throw error;
        }
    }, [isSuccess])

    useEffect(() => {
        if(!video){
            console.log('Video Is Loading...')
            return;
        }

        if(progress){
            video.currentTime = progress?.progress;
            console.log(progress)
        }

        const saveProgress =  async () => {
            const data = {
                postId : postId,
                progress : video.currentTime,
                duration : video.duration,
                completed : video.ended
            }
            
            try {
                if(progress !== null){
                    await saveProgressMutation.mutateAsync(data);
                }
            } catch (error) {
                throw error;
            }
        }

        const interval = setInterval(() => {
            if(!video.ended && !video.paused){
                saveProgress();
            }
        }, 5000)

        const handlePause = () => {
            saveProgress();
        }


        const handleEnded = () => {
            saveProgress();
        }

        const handleNavigate = () => {
            saveProgress();
        }

        video?.addEventListener("pause", handlePause)
        video?.addEventListener("ended", handleEnded)
        video?.addEventListener("navigate", handleNavigate)

        return () => {
            clearInterval(interval);
            video?.removeEventListener("pause", handlePause)
            video?.removeEventListener("ended", handleEnded)
            video?.removeEventListener("navigate", handleNavigate)
        }
    }, [video])

    if(isLoading || progressLoading){
        return <div>Loading Post...</div>
    }

    return (
        <>
        <div className="flex h-full">
            <div className="w-full border p-2 rounded h-full">
                <div className="">
                    <div className="w-full flex justify-center bg-black rounded-xl">
                        <VideoPlayer videoUrl={post?.video} thumbnailUrl={post?.thumbnail} videoRef={setVideo}/>
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

                        <div>
                            {user?.id === post?.owner ? "" : post?.isSubscribed ? <Button onClick={() => unsubscribeMutation.mutate(post?.owner)}>Subscribed</Button> : <Button className="h-min" onClick={() => subscribeMutation.mutate(post?.owner)} disabled={subscribeMutation.isPending}>{subscribeMutation.isPending ? "Subscribing" : "Subscribe"}</Button>}
                        </div>

                        <div>
                            {post?.isPostLiked ? <Button onClick={() => unlikeMutation.mutate(postId)} disabled={unlikeMutation.isPending}>{unlikeMutation.isPending ? "Unliking" : "Liked"}</Button> : <Button className="h-min" onClick={() => likeMutation.mutate(postId)} disabled={likeMutation.isPending}>{likeMutation.isPending ? "Liking" : "Like"}</Button>}
                        </div>

                        <div>
                            {post?.isPostDisliked ? <Button onClick={() => undislikeMutation.mutate(postId)} disabled={undislikeMutation.isPending}>{undislikeMutation.isPending ? "Undisliking" : "Disliked"}</Button> : <Button onClick={() => dislikeMutation.mutate(postId)} disabled={dislikeMutation.isPending}>{dislikeMutation.isPending ? "Disliking" : "Dislike"}</Button>}
                        </div>

                        <div>
                            <ShareBtn id={postId}/>
                        </div>

                        <div>
                            save to playlist / watchlater
                        </div>
                    </div>
                </div>

                <div className=" mt-2">
                    <div className="">
                        <div>
                            Views
                        </div>

                        <div>
                            {post?.likeCount} Likes
                        </div>

                        <div>
                            {post?.dislikeCount} Dislikes
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