import { NavLink } from "react-router"
import Icon from "../components/Icon"
import { useAuth } from "../features/AuthContext"
import postApi from "../api/post.api"
import { useQuery } from "@tanstack/react-query"
import { PostCard } from "../components"

function Subscription(){

    const {user} = useAuth()

    const subscriptions = user?.subscribedTo

    const {data : posts, isLoading} = useQuery({
        queryKey : ["postsBySubs"],
        queryFn : async () => {
            try {
                const res = await postApi.getAllPostsBySubs()
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
        <>
        <div className="flex border p-2 rounded">
            {user && subscriptions?.map((channel) => (
                <NavLink to={`/${channel?.channel?.username}/channel`} key={channel?.channelId}>
                    <div className="pl-4">
                        <div className="">
                            <Icon src={channel?.channel?.avatar} className="w-20 h-20"/>
                        </div>

                        <div className="flex justify-center">
                            {channel?.channel?.username}
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>

        <div className="border h-min p-2 mt-1 rounded flex flex-wrap justify-evenly">
            {posts && posts.map((post) => (
                <div key={post?.id}>
                    <PostCard src={post?.thumbnail} title={post?.title} avatar={post?.user?.avatar} owner={post?.user?.username} to={`/${post?.id}`} />
                </div>
            ))}
        </div>
        </>
    )
}

export default Subscription