import React, { Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import Error from "../components/Error";
import { fetchUserData } from "../redux/services/User";
import Home from "./Home";
// import Home from "./Home";

const LazySignUp = lazy(() => import("./SignUp"));
const LazyLogin = lazy(() => import("./LoginPage"));
const LazyForgotPassword = lazy(() => import("./ForgotPassword"));
const LazyResetPassword = lazy(() => import("./ResetPassword"));
const LazyHome = lazy(() => import("./LandingPage"));
const LazyUser = lazy(() => import("./UserInfo"));

export const navItems = [
  {
    path: "/signup",
    element: (
      <Suspense fallback={<h1>Loading</h1>}>
        <LazySignUp />
      </Suspense>
    ),
    protected: false,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<h1>Loading</h1>}>
        <LazyLogin />
      </Suspense>
    ),
    protected: false,
    errorElement: <Error />,
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<h1>Loading</h1>}>
        <LazyForgotPassword />
      </Suspense>
    ),
    protected: false,
    errorElement: <Error />,
  },
  {
    path: "/reset-password/:token",
    element: (
      <Suspense fallback={<h1>Loading</h1>}>
        <LazyResetPassword />
      </Suspense>
    ),
    protected: false,
    errorElement: <Error />,
  },
  {
    path: "/",
    element: <LazyHome />,
    protected: true,
    errorElement: <Error />,
  },
  //   {
  //     path: "/search",
  //     element: (
  //       <Suspense fallback={<h1>Loading</h1>}>
  //         <LazySearch />
  //       </Suspense>
  //     ),
  //     protected: false,
  //     errorElement: <Error />,
  //   },
  {
    path: "/profile",
    element: (
      <Suspense fallback={<h1>Loading</h1>}>
        <LazyUser />
      </Suspense>
    ),
    protected: true,
    errorElement: <Error />,
  },
];

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorPageStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 10000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "black",
    color: "white",
  };

  React.useEffect(() => {
    fetchUserData(dispatch, navigate);
  }, [localStorage.getItem("token")]);

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {navItems
          .filter((ele) => !ele.protected)
          .map((ele, i) => (
            <Route key={i} element={ele.element} path={ele.path} />
          ))}
        <Route element={<RequireAuth />}>
          {navItems
            .filter((ele) => ele.protected)
            .map((ele, i) => (
              <Route key={i} element={ele.element} path={ele.path} />
            ))}
        </Route>
        <Route
          path="*"
          element={
            <div style={errorPageStyle}>
              <h1>Error! Page not found</h1>
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default Navigation;
