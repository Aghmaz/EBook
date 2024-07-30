import { Svgs } from "../Svgs/svg-icons";

export const menuItems = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: Svgs.dashboard,
    link: "/",
    className: "item__hover sideBarLinks",
  },
  {
    label: "Management",
    key: "management",
    icon: Svgs.servicecategory,
    className: "item__hover sideBarLinks",
    children: [
      {
        label: "Books",
        key: "Books",
        link: "/books",
        className: "item__hover sideBarLinks",
        icon: Svgs.ellipse,
      },
    ],
  },
];
