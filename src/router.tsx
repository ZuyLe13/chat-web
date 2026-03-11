import { Routes, Navigate, Route } from "react-router"
import DashboardPage from "./pages/DashboardPage"
import ChatPage from "./pages/ChatPage"
import Layout from "./components/layout/Layout"

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to={'/dashboard'} replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
