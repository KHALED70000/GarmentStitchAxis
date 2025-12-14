import useRole from "../../../HooKs/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import BuyerDashBoardHome from "./BuyerDashBoardHome";
import ManagerDashboardHome from "./ManagerDashboardHome";



const DashboardHome = () => {
    const { role, roleLoading } = useRole();

    if(roleLoading){
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading w-18 loading-spinner text-primary"></span>
            </div>
        );
    }

    if(role === 'admin'){
        return <AdminDashboardHome></AdminDashboardHome>;
    }
    else if(role === 'manager'){
        return <ManagerDashboardHome></ManagerDashboardHome>;
    }
    else{
        return <BuyerDashBoardHome></BuyerDashBoardHome>;
    }
};

export default DashboardHome;