import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/main/MainLayout";
import Login from "../pages/auth/login/Login";
import NotFound from "../pages/notFound/NotFound";
import ArchivePage from "../pages/archive/Archive";
import BinPage from "../pages/bin/Bin";
import NotesPage from "../pages/notes/Notes";
import SignupPage from "../pages/auth/signup/signup";
// import PrivateRoute from "./PrivateRoute";
// import { UserRole } from "../types/enum";

const RouterProvider = () => {
  return (
    <Router>
      <Routes>
        {/* Main layout with nested routes */}
        {/* <Route
          path="/"
          element={
            <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
              <MainLayout />
            </PrivateRoute>
          }
        > */}
        <Route
          path="/"
          element={
            <MainLayout />
          }
        >

          <Route index element={<NotesPage />} />
          {/* Arcive Route */}
          <Route path="/archive" element={<ArchivePage />} />

          {/* Bin Route */}
          <Route path="/bin" element={<BinPage />} />
        </Route>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Register Route */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default RouterProvider;
