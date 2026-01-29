import { Route, Routes } from "react-router-dom";
import Navbar from "./components/shared/navbar";
import Home from "./pages/home";
import Auth from "./pages/auth";
import { Toaster } from "sonner";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
