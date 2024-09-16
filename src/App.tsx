import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Users from "./Users/Users";
import { AuthProvider } from "./authProvider";
import ProtectedRoute from "./ProtectedRoutes";
import Error from "./Error/Error";

function App() {
  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Error description="404 This page is not found" />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
