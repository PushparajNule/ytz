import api from "./client.js";

class SubsApi {

    getChannel(id){
        return api.get(`/subs/getChannel/${id}`)
    }

    subscribe(id){
        return api.post(`subs/subscribe/${id}`)
    }

    unsubscribe(id){
        return api.get(`subs/unsubscribe/${id}`)
    }

}

const subsApi = new SubsApi()

export default subsApi;