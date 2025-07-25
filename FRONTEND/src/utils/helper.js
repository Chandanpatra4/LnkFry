import { getCurrentUser } from "../api/user.api.js";
import { login } from "../store/slices/authSlice.js";
import { store } from "../store/store.js"
import { redirect } from "@tanstack/react-router"

export const checkAuth = async ({ context }) => {
    try {
        const { queryClient, store } = context;
        const user = await queryClient.ensureQueryData({
            querykey: ["currentUser"],
            queryFn: getCurrentUser,

        });
        if (!user) return false
        store.dispatch(login(user));
        const { isAuthenticated } = store.getState().auth;
        if (!isAuthenticated) return false;
        return true

    } catch (error) {
      return redirect ({to:'/auth'})
    }

}