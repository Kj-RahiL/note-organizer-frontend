import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";
// import { Spin } from 'antd'; // Import Spin
// import { LoadingOutlined } from '@ant-design/icons'; // Import LoadingOutlined

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

// const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />; // Define loading icon

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const auth = useAppSelector((state) => state.auth);
  // const [isReady, setIsReady] = useState(false); // Track if the app is ready

  // useEffect(() => {
  //   // Check if the auth state is populated
  //   if (auth !== undefined) {
  //     setIsReady(true);
  //   }
  // }, [auth]);

  // // Show loading spinner while waiting for Redux Persist to rehydrate
  // if (!isReady) {
  //   return <Spin indicator={loadingIcon} size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }} />;
  // }

  // Redirect to login if not authenticated
  if (!auth.isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect to home if user role is not allowed
  if (!allowedRoles.includes(auth?.user?.role ?? "")) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
