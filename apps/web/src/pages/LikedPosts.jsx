import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../features/AuthContext"
import postApi from "../api/post.api"
import { PostCard } from "../components"

function LikedPosts(){

    const {user} = useAuth()

    const {data : posts, isLoading} = useQuery({
        queryKey : ["likedPosts", user?.id],
        queryFn : async () => {
            try {
                const res = await postApi.getAllLikedPostsByUser()
                return res?.data?.data;
            } catch (error) {
                throw error;
            }
        }
    })

    if(isLoading){
        return <div>Loading...</div>
    }
    return (
        <div className="flex">
            {posts && posts.map((post) => (
                <div key={post?.postId}>
                    <PostCard src={post?.post?.thumbnail} title={post?.post?.title} avatar={post?.post?.user?.avatar} owner={post?.post?.user?.username} to={`/post/${post?.postId}`} />
                </div>
            ))}
        </div>
    )
}

export default LikedPosts