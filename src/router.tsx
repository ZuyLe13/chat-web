import { Routes, Navigate, Route } from "react-router"
import ChatPage from "./pages/ChatPage"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to={'/home'} replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
