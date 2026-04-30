import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./pages/index.tsx"),
  route("preregister", "./pages/preregister.tsx"),
  route("results", "./pages/results.tsx"),
  route("admin", "./pages/admin.tsx"),
] satisfies RouteConfig;
