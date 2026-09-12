import api from "./client.js";

class AuthApi {

    health(){
        return api.get("/health")
    }
    
    login(username, email, password) {
        return api.post("/auth/login", {username, email, password})
    }

    signup(username, email, password, avatar, coverImage){
        return api.post("/auth/signUp", {username, email, password, avatar, coverImage})
    }

    logout(){
        return api.post("/auth/logout")
    }

    currentUser(){
        return api.get("/auth/current-user")
    }

    changePassword(oldPassword, newPassword){
        return api.post("/auth/changePassword", {oldPassword, newPassword})
    }

    changeEmail(newEmail){
        return api.post("/auth/changeEmail", {newEmail})
    }

    verifyChangeEmail(token){
        return api.post(`/auth/verify-email-change/${token}`)
    }

    updateAccountDetails(description, username){
        return api.patch("/auth/updateAccountDetails", {description, username})
    }

    updateAvatar(avatar){
        return api.patch("/auth/updateAvatar", {avatar})
    }

    updateCoverImage(coverImage){
        return api.patch("/auth/updateCoverImage", {coverImage})
    }
}

const authApi = new AuthApi()

export default authApi;