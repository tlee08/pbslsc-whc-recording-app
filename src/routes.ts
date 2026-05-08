import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./pages/Index.tsx"),
  route("preregister", "./pages/Preregister.tsx"),
  route("results", "./pages/Results.tsx"),
  route("admin", "./pages/Admin.tsx"),
] satisfies RouteConfig;
