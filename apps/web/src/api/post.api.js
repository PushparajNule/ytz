import api from "./client.js";

class PostApi {

    createPost(payload){
        return api.post("/post/createPost", payload)
    }

    updatePost(payload){
        return api.patch(`/post/updatePost/${id}`, payload)
    }

    getPost(id){
        return api.get(`/post/getPost/${id}`)
    }

    deletePost(id){
        return api.delete(`post/deletePost/${id}`)
    }

    getAllPosts(){
        return api.get(`post/getAllPosts`)
    }

    getAllPostsByUser(id){
        return api.get(`post/getAllPostsByUser/${id}`)
    }

    getAllPostsBySubs(){
        return api.get(`post/getAllPostsBySubs`)
    }
}

const postApi = new PostApi()

export default postApi