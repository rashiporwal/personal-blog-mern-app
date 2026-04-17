import React from "react";


import { BrowserRouter,Routes,Route } from "react-router-dom";


import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import CreatePost from "./pages/CreatePost";
import EditPost from './pages/EditPost';
import CategoryPage from "./pages/CategoryPage";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

function  App(){
  return (
    <BrowserRouter>
      <Navbar />

      <main className="container" style={{ margin: "1rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/post/:slug" element={<PostPage />} />

          <Route path="/category/:categoryName" element={<CategoryPage />} />


          <Route path="/admin/login" element={<LoginPage />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-post/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;