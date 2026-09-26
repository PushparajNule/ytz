import api from "./client.js";

class AuthApi {

    health(){
        return api.get("/health")
    }
    
    login(payload) {
        return api.post("/auth/login", payload)
    }

    signup(payload){
        return api.post("/auth/signUp", payload)
    }

    logout(){
        return api.post("/auth/logout")
    }

    currentUser(){
        return api.get("/auth/current-user")
    }

    changePassword(payload){
        return api.post("/auth/changePassword", payload)
    }

    changeEmail(payload){
        return api.post("/auth/changeEmail", payload)
    }

    verifyChangeEmail(token){
        return api.post(`/auth/verify-email-change/${token}`)
    }

    updateAccountDetails(payload){
        return api.patch("/auth/updateAccountDetails", payload)
    }

    updateAvatar(payload){
        return api.patch("/auth/updateAvatar", payload)
    }

    updateCoverImage(payload){
        return api.patch("/auth/updateCoverImage", payload)
    }
}

const authApi = new AuthApi()

export default authApi;