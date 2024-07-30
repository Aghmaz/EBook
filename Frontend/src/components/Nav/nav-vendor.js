import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Button } from "antd";
import Logo from "../Logo";
import { Svgs } from "../Svgs/svg-icons";
import PerfectScrollbar from "react-perfect-scrollbar";
import Logout from "./logout";

const VendorNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.clear();
    navigate("/signup");
  };

  return (
    <div className="px-2 py-6">
      <Logo />
      <PerfectScrollbar className="height-scroll">
        <Menu
          className="!mt-8 flex flex-col"
          mode="inline"
          items={[
            {
              label: "Dashboard",
              key: "dashboard",
              icon: Svgs.dashboard,
              Link: "/",
              className: `item__hover sideBarLinks ${
                location.pathname === "/" ? "active" : ""
              }`,
              onClick: ({ item }) => navigate(item.props?.Link),
            },
            {
              label: "Service Subscription",
              key: "servicesubscription",
              Link: "/service-subscription",
              className: `item__hover sideBarLinks ${
                location.pathname === "/service-subscription" ? "active" : ""
              }`,
              icon: Svgs.servicecategory,
              onClick: ({ item }) => navigate(item.props?.Link),
            },
            {
              label: "Requests",
              key: "request",
              icon: Svgs.proposals,
              Link: "/request",
              className: `item__hover sideBarLinks ${
                location.pathname === "/request" ? "active" : ""
              }`,
              onClick: ({ item }) => navigate(item.props?.Link),
            },
            {
              label: "Purchase Credits",
              key: "purchasecredits",
              icon: Svgs.creditsdiscount,
              Link: "/credit",
              className: `item__hover sideBarLinks ${
                location.pathname === "/credit" ? "active" : ""
              }`,
              onClick: ({ item }) => navigate(item.props?.Link),
            },
            {
              label: "Logs",
              key: "logs",
              icon: Svgs.logs,
              Link: "/log",
              className: `item__hover sideBarLinks ${
                location.pathname === "/log" ? "active" : ""
              }`,
              onClick: ({ item }) => navigate(item.props?.Link),
            },
            {
              label: "Payment History",
              key: "paymenthistory",
              icon: Svgs.areamanagement,
              Link: "/payment",
              className: `item__hover sideBarLinks ${
                location.pathname === "/payment" ? "active" : ""
              }`,
              onClick: ({ item }) => navigate(item.props?.Link),
            },
          ]}
        ></Menu>
      </PerfectScrollbar>
      <Link className="border-[#CED3DA] border-opacity-[0.2] border-t-2 pt-5 w-[94%] lg:fixed lg:bottom-0 lg:left-[2.5] bg-primary h-[100px] lg:w-[260px]">
        <Logout />
      </Link>
    </div>
  );
};

export default VendorNav;
