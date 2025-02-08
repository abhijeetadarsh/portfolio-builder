import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CreatePortfolio from "./pages/CreatePortfolio";
import EditPortfolio from "./pages/EditPortfolio";
import ViewPortfolio from "./pages/ViewPortfolio";
// import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreatePortfolio />} />
            <Route path="/edit/:id" element={<EditPortfolio />} />
            <Route path="/portfolio/:link" element={<ViewPortfolio />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
