import { Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { Routes as AppRoutes } from "./routes";

export const RouterManager = () => {
  const routes = useMemo(
    () =>
      Object.keys(AppRoutes).map((path) => {
        const RouteComponent = AppRoutes[path];
        return <Route key={path} path={path} element={<RouteComponent />} />;
      }),
    []
  );

  return <Routes>{routes}</Routes>;
};
