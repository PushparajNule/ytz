import api from "./client.js";

class SubsApi {

    getChannel(username){
        return api.get(`/subs/getChannel/${username}`)
    }

    subscribe(id){
        return api.get(`subs/subscribe/${id}`)
    }

    unsubscribe(id){
        return api.get(`subs/unsubscribe/${id}`)
    }

}

const subsApi = new SubsApi()

export default subsApi;