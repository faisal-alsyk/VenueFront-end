import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";

// core components/views for Admin layout
// import DashboardPage from "./views/Dashboard/Dashboard.js";
// import LoginPage from "./views/Authentication/login.js";
import userPage from "./views/Users/Users.js"
import adminDashboard from "./views/Admin Dashboard/dashboard.js"


const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: Dashboard,
        component: adminDashboard,
        layout: "/admin"
    },
    {
        path: "/users",
        name: "User",
        icon: Person,
        component: userPage,
        layout: "/admin"
    }
];

export default dashboardRoutes;
