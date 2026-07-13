import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Causes from "@/pages/Causes";
import Evenements from "@/pages/Evenements";
import Blog from "@/pages/Blog";
import ArticleBlog from "@/pages/ArticleBlog";
import Boutique from "@/pages/Boutique";
import Panier from "@/pages/Panier";
import APropos from "@/pages/APropos";
import Contact from "@/pages/Contact";
import Connexion from "@/pages/Connexion";
import EspaceMembre from "@/pages/EspaceMembre";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/causes" element={<Causes />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<ArticleBlog />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/espace-membre" element={<EspaceMembre />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
