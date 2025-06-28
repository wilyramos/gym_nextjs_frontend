import { cache } from "react";



export const verifySession = cache(async () => {

    

    return {
        user: null,
        isAuthenticated: true,
    }
})