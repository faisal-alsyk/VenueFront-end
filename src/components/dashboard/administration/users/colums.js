import React from "react";
import { Divider } from "antd";
const columns = (onEdit, onDelete) => [
  {
    title: "ID #",
    dataIndex: "_id",
    key: "_id"
  },
  {
    title: "Staff ID",
    dataIndex: "staffId",
    key: "staffId"
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a onClick={() => onEdit(record._id)}><svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6875 0.375H2.0625C0.923828 0.375 0 1.29883 0 2.4375V17.5625C0 18.7012 0.923828 19.625 2.0625 19.625H22.6875C23.8262 19.625 24.75 18.7012 24.75 17.5625V2.4375C24.75 1.29883 23.8262 0.375 22.6875 0.375ZM7.5625 4.5C9.0793 4.5 10.3125 5.7332 10.3125 7.25C10.3125 8.7668 9.0793 10 7.5625 10C6.0457 10 4.8125 8.7668 4.8125 7.25C4.8125 5.7332 6.0457 4.5 7.5625 4.5ZM12.375 14.675C12.375 15.1305 11.9453 15.5 11.4125 15.5H3.7125C3.17969 15.5 2.75 15.1305 2.75 14.675V13.85C2.75 12.4836 4.04336 11.375 5.6375 11.375H5.85234C6.38086 11.5941 6.95664 11.7188 7.5625 11.7188C8.16836 11.7188 8.74844 11.5941 9.27266 11.375H9.4875C11.0816 11.375 12.375 12.4836 12.375 13.85V14.675ZM22 12.4062C22 12.5953 21.8453 12.75 21.6562 12.75H15.4688C15.2797 12.75 15.125 12.5953 15.125 12.4062V11.7188C15.125 11.5297 15.2797 11.375 15.4688 11.375H21.6562C21.8453 11.375 22 11.5297 22 11.7188V12.4062ZM22 9.65625C22 9.84531 21.8453 10 21.6562 10H15.4688C15.2797 10 15.125 9.84531 15.125 9.65625V8.96875C15.125 8.77969 15.2797 8.625 15.4688 8.625H21.6562C21.8453 8.625 22 8.77969 22 8.96875V9.65625ZM22 6.90625C22 7.09531 21.8453 7.25 21.6562 7.25H15.4688C15.2797 7.25 15.125 7.09531 15.125 6.90625V6.21875C15.125 6.02969 15.2797 5.875 15.4688 5.875H21.6562C21.8453 5.875 22 6.02969 22 6.21875V6.90625Z" fill="#005404"/>
</svg>
</a>
        <Divider type="vertical" />
        <a onClick={() => onDelete(record._id)}><svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.7579 17.8945L14.1524 9.69922C16.0977 9.01172 17.5 7.17969 17.5 5C17.5 2.23828 15.2618 0 12.5 0C9.87895 0 7.75395 2.02344 7.54301 4.58594L1.77738 0.132812C1.50395 -0.078125 1.11332 -0.03125 0.898477 0.242188L0.132852 1.22656C-0.0780851 1.5 -0.0312102 1.89062 0.242227 2.10156L23.2266 19.8633C23.5 20.0742 23.8907 20.0273 24.1055 19.7539L24.8711 18.7656C25.0821 18.5 25.0313 18.1055 24.7579 17.8945ZM3.75004 16.5V18.125C3.75004 19.1602 4.58988 20 5.62504 20H19.3047L8.1016 11.3398C5.63285 11.7695 3.75004 13.9062 3.75004 16.5Z" fill="#E6582B"/>
</svg>
</a>
      </span>
    )
  }
];

export default columns;
