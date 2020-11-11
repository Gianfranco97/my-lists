import MyLists from "./MyLists";

const adminRoutes = [
  {
    path: "/",
    exact: true,
    component: MyLists,
    isPrivate: true,
    name: "Admin",
  },
];

export default adminRoutes;
