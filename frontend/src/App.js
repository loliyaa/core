import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Causes from "@/pages/Causes";
import Evenements from "@/pages/Evenements";
import Blog from "@/pages/Blog";
import Boutique from "@/pages/Boutique";
import APropos from "@/pages/APropos";
import Contact from "@/pages/Contact";

function App() {
  useEffect(() => {}, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/causes" element={<Causes />} />
          <Route path="/evenements" element={<Evenements />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
