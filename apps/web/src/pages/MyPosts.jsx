import { useQuery } from "@tanstack/react-query";
import postApi from "../api/post.api";
import { PostCard } from "../components";
import { useParams } from "react-router";
import subsApi from "../api/subs.api";

function MyPosts() {

    const {username} = useParams()

    const {data : posts, isLoading} = useQuery({
        queryKey : ["posts"],

        queryFn : async () => {
            try {
                const user = await subsApi.getChannel(username)
                const res = await postApi.getAllPostsByUser(user?.data?.data?.id)
                return res?.data?.data;
            } catch (error) {
                throw error;
            }
        }
    })

    if(isLoading){
        return <div>Loading Posts...</div>
    }

    if(posts.length == 0){
        return <div>No Posts Uploaded Yet...</div>
    }

    return (
        <>
        <div className="flex flex-wrap justify-evenly">
            {posts && posts.map((post) => (
                <div key={post?.id}>
                    <PostCard src={post?.thumbnail} alt={post?.title} title={post?.title} owner={post?.user?.username} avatar={post?.user?.avatar} to={`/${post?.id}`}/>
                </div>
            ))}
        </div>
        </>
    )
}

export default MyPosts