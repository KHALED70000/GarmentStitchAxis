import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useRole = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading: roleLoading, data: role = 'user'} = useQuery({
        queryKey: ['allusers', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allusers/${user?.email}/role`);
            return res.data?.role || 'user';
        }
    })
    
    return {role, roleLoading};
};

export default useRole;