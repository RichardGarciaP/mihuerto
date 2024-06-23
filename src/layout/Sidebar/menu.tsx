import { sidebarMenuType } from "Types/LayoutDataType";
import {
  FaBug,
  FaChartSimple,
  FaHouse,
  FaSunPlantWilt,
  FaUsers,
} from "react-icons/fa6";

export const MenuList: sidebarMenuType[] = [
  {
    title: "General",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Dashboards",
        id: 1,
        icon: <FaHouse />,
        pathSlice: "dashboard",
        type: "link",
        badge: "badge badge-light-primary",
        path: "/dashboard/home",
        badgetxt: "8",
      },
      {
        title: "Gestion de accesos",
        id: 2,
        icon: <FaUsers />,
        pathSlice: "users",
        type: "sub",
        badge: "badge badge-light-primary",
        badgetxt: "8",
        children: [
          {
            path: "/dashboard/users",
            title: "Administradores",
            type: "link",
          },
          {
            path: "/dashboard/farmers",
            title: "Huertistas",
            type: "link",
          },
          { path: "/dashboard/roles", title: "Roles", type: "link" },
        ],
      },
      {
        title: "Gestion de huertos",
        id: 3,
        icon: <FaSunPlantWilt />,
        pathSlice: "garden",
        type: "sub",
        badge: "badge badge-light-primary",
        badgetxt: "8",
        children: [
          { path: "/dashboard/categories", title: "Categorias", type: "link" },
          { path: "/dashboard/crops", title: "Cultivos", type: "link" },
        ],
      },
      {
        title: "Protección y Nutrición",
        id: 4,
        icon: <FaBug />,
        pathSlice: "protection-nutrition",
        type: "sub",
        badge: "badge badge-light-primary",
        badgetxt: "8",
        children: [
          { path: "/dashboard/plagues", title: "Plagas", type: "link" },
          {
            path: "/dashboard/fertilizer",
            title: "Fertilizantes",
            type: "link",
          },
          {
            path: "/dashboard/reproduction",
            title: "Metodos de reproducción",
            type: "link",
          },
        ],
      },
      {
        title: "Gestion de reportes",
        id: 5,
        icon: <FaChartSimple />,
        pathSlice: "reports",
        type: "sub",
        badge: "badge badge-light-primary",
        badgetxt: "8",
        path: "/dashboard/reports",
        children: [
          {
            path: "/dashboard/reports/admins",
            title: "Administradores",
            type: "link",
          },
          {
            path: "/dashboard/reports/crops-by-user",
            title: "Cultivos por Usuario",
            type: "link",
          },
          {
            path: "/dashboard/reports/user-by-crops",
            title: "Usuario por Cultivos",
            type: "link",
          },
        ],
      },
    ],
  },
];
