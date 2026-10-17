import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import authApi from "../api/auth.api";

const AuthContext = createContext()

export function AuthProvider({children}){
        const {data : user, isError, isLoading} = useQuery({
        queryKey : ["user"],
        queryFn : async () => {
            try {
                const user = await authApi.currentUser()
                return user;
            } catch (error) {
                if(error.response?.status !== 401){
                    throw error
                }
                await authApi.refreshAccessToken()
                return await authApi.currentUser()
            }
        },
        staleTime : (1000 * 60) * 30
    })

    return (
    <AuthContext.Provider value={{user, isLoading, isError}}>
        {children}
    </AuthContext.Provider>)
}

export function useAuth(){
    return useContext(AuthContext);
}