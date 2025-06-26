import "./App.css";
import InventoryManagement from "./pages/Products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import StockHistory from "./pages/StockHistory";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Router>
        <Routes>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <Layout>
                  <InventoryManagement />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/stockHistory"
            element={
              <ProtectedRoute>
                <Layout>
                  <StockHistory />
                </Layout>
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </>
  );
}

export default App;
