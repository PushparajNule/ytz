import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../features/AuthContext"
import postApi from "../api/post.api"
import { PostCard } from "../components"

function Home(){

    const {user} = useAuth()

    const {data : posts, isLoading} = useQuery({
        queryKey : ["posts"],

        queryFn : async () => {
            try {
                const posts = await postApi.getAllPosts()

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
            <div className="">
                {user && <h1>Welcome Back!!! {user?.data?.data?.username}</h1>}
            </div>

            <div className="flex">
                {posts && posts.map((post) => (
                    <div key={post?.id}>
                        <PostCard src={post?.thumbnail} alt={post?.title} title={post?.title} owner={post?.user?.username} avatar={post?.user?.avatar} to={`/${post?.id}`}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;