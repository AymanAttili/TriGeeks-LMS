import { Suspense, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";

import { Grid2 as Grid } from "@mui/material";
import { AppProvider } from "@toolpad/core/react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

import useDashboardNavigation from "../utils/useDashboardNavigation.tsx";


import logo from "../images/logo.png";
import { roleNames } from '../Enums/roles.ts';
import SpinnerLoader from './SpinnerLoader.tsx';
import { useUser } from '../features/users/useUser.ts';
import { useLogout } from '../features/authentication/useLogout.ts';
import theme from '../utils/theme.ts';
import NotificationsToolbarAction from './NotificationsToolbarAction.tsx';

const AppLayout = () => {
  const { user } = useUser();
  const { logout } = useLogout();
  const { quizId } = useParams();
  const isQuizPage = quizId !== undefined;

  const navigation = useDashboardNavigation(roleNames[user.role]);
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
      image: user.profilePicture?.path,
    };
  }, [user]);

  return (
    <AppProvider
      branding={
        !isQuizPage ?
          {
            logo: <img src={logo} alt="TriGeeks LMS" />,
            title: "TriGeeks LMS",
          }
          :
          {
            logo: '',
            title: "",
          }
      }
      navigation={navigation}
      authentication={authentication}
      theme={theme}
      session={{
        user: dashboardUser,
      }}
    >
      <DashboardLayout sidebarExpandedWidth={"250px"}
        hideNavigation={isQuizPage}
        slots={{
          toolbarActions: NotificationsToolbarAction
        }}>
        <Suspense fallback={<SpinnerLoader />}>
          <Grid
            container
            flexDirection={'column'}
            alignItems={"stretch"}
            justifyContent={"stretch"}
            sx={{
              flex: 1,
              bgcolor: "whitesmoke",
            }}
            padding={{ sm: 1 }}
          >
            <Outlet />
          </Grid>
        </Suspense>
      </DashboardLayout>
    </AppProvider>
  );
};

export default AppLayout;
