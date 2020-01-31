import React, { useState, useEffect }  from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuItem from "./menu";

export default function Sidebar() {
    const [path, setPath] = useState(window.location.pathname);
   // const dispatch = useDispatch();
   // const history = useHistory();
    useEffect(() => {
      setPath(window.location.pathname);
    }, [window.location.pathname]);

  return (
    <div style={{ width: "100%" , marginBottom: "19px"}}>
      <div className="nav-down-manu">
        <MenuItem
          link="/admin/users"
          selected={(path === "/admin/users") || (path === "/admin/users/create") || (path.includes("/admin/users/view/")) || (path.includes("/admin/users/update") || (path.includes("/admin/users/resetpassword")))  ? true : false}
          title="USERS"
        />
        <MenuItem
            link="/admin/venues"
            selected={path === "/admin/venues" || (path === "/admin/venues/create") || (path.includes("/admin/venues/view/")) || (path.includes("/admin/venues/update"))? true: false}
            title="VENUES"
            />
        {/* <MenuItem
          link="/dashboard/users"
          selected={path == "/dashboard/users" ? true : false}
          title="Users"
        />
        <MenuItem
          link="/dashboard/types"
          selected={path == "/dashboard/types" ? true : false}
          title="Vehicle Class"
        /> */}
        {/* <MenuItem Icon={MdDashboard} title="dashboard" />
          <MenuItem Icon={MdDashboard} title="dashboard" /> */}
      </div>
    </div>
  );
}
