import api from "./client.js";

class PostApi {

    createPost(status, title, description, thumbnail, video){
        return api.post("/post/createPost", {status, title, description, thumbnail, video})
    }

    updatePost(status, title, description, id){
        return api.patch(`/post/updatePost/${id}`, {status, title, description})
    }

    getPost(id){
        return api.get(`/post/getPost/${id}`)
    }

    deletePost(id){
        return api.delete(`post/deletePost/${id}`)
    }
}

const postApi = new PostApi()

export default postApi