import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/sections/PageHero";
import { PRODUCTS } from "@/data/content";

export default function Boutique() {
  const [count, setCount] = useState(0);

  const addToCart = (name) => {
    setCount((c) => c + 1);
    toast.success("Ajouté au panier", {
      description: `« ${name} » — 100% des bénéfices financent nos programmes. (Démonstration)`,
    });
  };

  return (
    <div data-testid="boutique-page">
      <PageHero
        overline="Boutique solidaire"
        title="Consommez utile. Changez des vies."
        text="Chaque achat finance directement nos programmes de terrain. Artisanat équitable et produits éco-responsables."
        image={PRODUCTS[1].image}
      />

      <section className="bg-[#FDFDFD] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between mb-12">
            <p className="font-body text-zinc-500">{PRODUCTS.length} produits</p>
            <div
              data-testid="cart-indicator"
              className="flex items-center gap-2 font-bold text-zinc-900"
            >
              <ShoppingBag className="h-5 w-5" />
              Panier ({count})
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {PRODUCTS.map((p, i) => (
              <motion.article
                key={p.id}
                data-testid={`product-card-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl aspect-square mb-4 bg-zinc-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    data-testid={`add-to-cart-${i}`}
                    onClick={() => addToCart(p.name)}
                    aria-label={`Ajouter ${p.name} au panier`}
                    className="absolute bottom-3 right-3 h-11 w-11 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-[#D62828] hover:text-white"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <span className="font-body text-xs uppercase tracking-widest text-zinc-400 font-bold">
                  {p.category}
                </span>
                <h2 className="font-heading font-bold text-lg md:text-xl text-zinc-900 mt-1 leading-snug">
                  {p.name}
                </h2>
                <p className="font-heading font-bold text-[#D62828] text-lg mt-1">{p.price}€</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
