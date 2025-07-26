import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Navbar";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import OMRUpload from "./components/OMR/OMRUpload";
import TextEvaluation from "./components/TextEvaluation/TextEvaluation";
import AuthForm from "./components/AuthForm/AuthForm";
import { AuthProvider } from "./context/AuthContext";
import useAuth from "./context/useAuth";
import "./App.css";

function App() {
  const { isAuthenticated, user } = useAuth(); 

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <AuthForm isLogin={true} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <AuthForm isLogin={false} />
              )
            }
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard user={user} />
              ) : (
                <Navigate to="/login" state={{ from: "/dashboard" }} />
              )
            }
          />
          <Route
            path="/upload-omr"
            element={
              isAuthenticated ? (
                <OMRUpload user={user} />
              ) : (
                <Navigate to="/login" state={{ from: "/upload-omr" }} />
              )
            }
          />
          <Route
            path="/text-evaluation"
            element={
              isAuthenticated ? (
                <TextEvaluation user={user} />
              ) : (
                <Navigate to="/login" state={{ from: "/text-evaluation" }} />
              )
            }
          />

          {/* Catch-all for unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Wrap `App` inside `AuthProvider` in `index.js`
export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
