import React, { useState, useEffect }  from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuItem from "../administration/menu";

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
          link="/venuebooking/booking"
          selected={path === "/venuebooking/booking"  ? true : false}
          title="View All Booking"
        />
        <MenuItem
            link="/venuebooking/admin"
            selected={path === "/venuebooking/admin" ? true: false}
            title="View Admin Booking"
            />
            <MenuItem
            link="/venuebooking/priority"
            selected={path === "/venuebooking/priority" ? true: false}
            title="Priority Booking"
            />
            <MenuItem
            link="/venuebooking/bulk"
            selected={path === "/venuebooking/bulk" ? true: false}
            title="Bulk Booking"
            />
      </div>
    </div>
  );
}
