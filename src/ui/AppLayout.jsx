import { Suspense, useMemo } from "react";
import { Outlet } from "react-router-dom";

import { Grid2 as Grid } from "@mui/material";
import { AppProvider } from "@toolpad/core/react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

import theme from "../utils/theme";
import useDashboardNavigation from "../utils/useDashboardNavigation.jsx";
import { useUser } from "../features/users/useUser.js";
import { useLogout } from "../features/authentication/useLogout.js";

import SpinnerLoader from "./SpinnerLoader.jsx";

import logo from "../images/logo.jpg";

const AppLayout = () => {
  const { user } = useUser();
  const { logout } = useLogout();
  const navigation = useDashboardNavigation(user.role);
  const authentication = useMemo(() => {
    return {
      signOut: logout,
      signIn: () => null,
    };
  }, [logout]);

  const dashboardUser = useMemo(() => {
    return {
      id: user.workId,
      email: user.email,
      name: user.firstName + " " + user.lastName,
      image: user.image,
    };
  }, [user]);

  return (
    <AppProvider
      branding={{
        logo: <img src={logo} alt="Makassed LMS" />,
        title: "Makassed LMS",
      }}
      navigation={navigation}
      authentication={authentication}
      theme={theme}
      session={{
        user: dashboardUser,
      }}
    >
      <DashboardLayout sidesidebarExpandedWidth={"250px"}>
        <Suspense fallback={<SpinnerLoader />}>
          <Grid
            container
            alignItems={"start"}
            justifyContent={"center"}
            sx={{
              flex: 1,
              bgcolor: "whitesmoke",
            }}
          >
            <Outlet />
          </Grid>
        </Suspense>
      </DashboardLayout>
    </AppProvider>
  );
};

export default AppLayout;
