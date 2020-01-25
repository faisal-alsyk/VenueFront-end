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
    <div style={{ width: "100%" }}>
       
      <div className="nav-down-manu">
        <MenuItem
          link="/dashboard1/admin"
          selected={path === "/dashboard1/admin" ? true : false}
          title="Users"
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
