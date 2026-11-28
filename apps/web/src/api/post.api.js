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
        return api.delete(`/post/deletePost/${id}`)
    }

    getAllPosts(){
        return api.get(`/post/getAllPosts`)
    }

    getAllPostsByUser(id){
        return api.get(`/post/getAllPostsByUser/${id}`)
    }

    getAllPostsBySubs(){
        return api.get(`/post/getAllPostsBySubs`)
    }

    likePost(id){
        return api.post(`/post/likePost/${id}`)
    }

    dislikePost(id){
        return api.post(`/post/dislikePost/${id}`)
    }

    unlikePost(id){
        return api.post(`/post/unlikePost/${id}`)
    }

    undislikePost(id){
        return api.post(`/post/undislikePost/${id}`)
    }

    getAllLikedPostsByUser(){
        return api.get(`/post/getAllLikedPostsByUser`)
    }

    createWatchHistory(id){
        return api.post(`/post/createWatchHistory/${id}`)
    }

    updateWatchHistory(payload){
        return api.patch(`/post/updateWatchHistory`, payload)
    }

    getWatchHistory(){
        return api.get(`/post/getWatchHistory`)
    }

    deleteWatchHistory(id){
        return api.delete(`/post/deleteWatchHistory/${id}`)
    }

    getPostWatchHistory(id){
        return api.get(`/post/getPostWatchHistory/${id}`)
    }
}

const postApi = new PostApi()

export default postApi