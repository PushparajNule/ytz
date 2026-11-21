import { useQuery } from "@tanstack/react-query";
import postApi from "../api/post.api";
import { PostCard } from "../components";
import { useAuth } from "../features/AuthContext";

function MyPosts() {

    const {user} = useAuth()

    const {data : posts, isLoading} = useQuery({
        queryKey : ["posts"],

        queryFn : async () => {
            try {
                const posts = await postApi.getAllPostsByUser(user?.id)

                return posts?.data?.data;
            } catch (error) {
                throw error;
            }
        }
    })

    if(isLoading){
        return <div>Loading Posts...</div>
    }

    return (
        <>
        <div className="flex">
            {posts && posts.map((post) => (
                <div key={post?.id}>
                    <PostCard src={post?.thumbnail} alt={post?.title} title={post?.title} owner={post?.user?.username} avatar={post?.user?.avatar} to={`/${post?.title}`}/>
                </div>
            ))}
        </div>
        </>
    )
}

export default MyPosts