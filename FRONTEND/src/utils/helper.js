import { getCurrentUser } from "../api/user.api.js";
import { login } from "../store/slices/authSlice.js";
import { store } from "../store/store.js"
import { redirect } from "@tanstack/react-router"

export const checkAuth = async ({ context }) => {
    try {
        const { queryClient, store } = context;
        
        // Check if user is already authenticated in Redux store
        const { isAuthenticated } = store.getState().auth;
        if (isAuthenticated) return true;
        
        // Try to get current user from API
        const data = await queryClient.ensureQueryData({
            queryKey: ["currentUser"],
            queryFn: getCurrentUser,
        });
        
        if (!data || !data.user) {
            throw new Error("No user found");
        }
        
        store.dispatch(login(data.user));
        return true;

    } catch (error) {
        console.log("Auth check failed:", error);
        return redirect({ to: '/auth' });
    }
}