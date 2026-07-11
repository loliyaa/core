import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ShieldCheck, Heart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

const SHIPPING = 4.9;

export default function Panier() {
  const { items, updateQty, removeItem, clear, count, subtotal } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal > 60 || items.length === 0 ? 0 : SHIPPING;
  const total = subtotal + shipping;

  const checkout = () => {
    toast.success("Commande confirmée !", {
      description: "Maquette — le paiement sera géré sur Joomla. Merci pour votre soutien !",
    });
    clear();
    setTimeout(() => navigate("/boutique"), 800);
  };

  return (
    <div data-testid="cart-page" className="min-h-screen bg-[#FDFDFD] pt-28 md:pt-36 pb-24">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-10 bg-[#D62828]" />
          <span className="font-body text-xs uppercase tracking-[0.25em] font-bold text-zinc-500">
            Boutique solidaire
          </span>
        </div>
        <h1 className="font-heading font-extrabold text-4xl md:text-6xl tracking-tighter text-zinc-900 mb-10">
          Votre panier
        </h1>

        {count === 0 ? (
          <div
            data-testid="empty-cart"
            className="bg-white rounded-2xl border border-zinc-200 py-20 flex flex-col items-center text-center px-6"
          >
            <div className="h-16 w-16 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
              <ShoppingBag className="h-7 w-7 text-zinc-400" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-zinc-900">Votre panier est vide</h2>
            <p className="font-body text-zinc-500 mt-2 max-w-sm">
              Découvrez nos produits solidaires : chaque achat finance nos programmes de terrain.
            </p>
            <Link
              to="/boutique"
              data-testid="back-to-shop"
              className="mt-8 inline-flex items-center gap-2 bg-[#D62828] hover:bg-[#B31E1E] text-white font-bold px-8 py-4 rounded-full transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Retour à la boutique
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Items */}
            <div className="lg:col-span-8 space-y-4">
              <AnimatePresence initial={false}>
                {items.map((it, i) => (
                  <motion.div
                    key={it.id}
                    data-testid={`cart-item-${i}`}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-4 md:gap-6 bg-white rounded-2xl border border-zinc-200 p-4 md:p-5"
                  >
                    <div className="h-24 w-24 md:h-28 md:w-28 shrink-0 rounded-xl overflow-hidden bg-zinc-100">
                      <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="font-body text-xs uppercase tracking-widest text-zinc-400 font-bold">
                            {it.category}
                          </span>
                          <h3 className="font-heading font-bold text-lg text-zinc-900 leading-snug">
                            {it.name}
                          </h3>
                        </div>
                        <button
                          data-testid={`remove-item-${i}`}
                          onClick={() => removeItem(it.id)}
                          aria-label="Retirer du panier"
                          className="text-zinc-400 hover:text-[#D62828] transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-end justify-between pt-3">
                        <div className="flex items-center border border-zinc-300 rounded-full">
                          <button
                            data-testid={`qty-minus-${i}`}
                            onClick={() => updateQty(it.id, -1)}
                            aria-label="Diminuer la quantité"
                            className="h-9 w-9 flex items-center justify-center text-zinc-600 hover:text-[#D62828]"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-bold text-zinc-900">{it.qty}</span>
                          <button
                            data-testid={`qty-plus-${i}`}
                            onClick={() => updateQty(it.id, 1)}
                            aria-label="Augmenter la quantité"
                            className="h-9 w-9 flex items-center justify-center text-zinc-600 hover:text-[#D62828]"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="font-heading font-bold text-xl text-zinc-900">
                          {(it.price * it.qty).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex justify-between items-center pt-2">
                <Link
                  to="/boutique"
                  className="inline-flex items-center gap-2 font-body font-semibold text-zinc-600 hover:text-[#D62828] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Continuer mes achats
                </Link>
                <button
                  data-testid="clear-cart"
                  onClick={clear}
                  className="font-body text-sm text-zinc-400 hover:text-[#D62828] transition-colors"
                >
                  Vider le panier
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-7">
                <h2 className="font-heading font-bold text-xl text-zinc-900 mb-6">Récapitulatif</h2>
                <div className="space-y-3 font-body text-zinc-600">
                  <div className="flex justify-between">
                    <span>Sous-total ({count} article{count > 1 ? "s" : ""})</span>
                    <span className="font-semibold text-zinc-900">{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span className="font-semibold text-zinc-900">
                      {shipping === 0 ? "Offerte" : `${shipping.toFixed(2)}€`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-zinc-400">
                      Livraison offerte dès 60€ d&apos;achat.
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 mt-5 pt-5">
                  <span className="font-heading font-bold text-lg text-zinc-900">Total</span>
                  <span className="font-heading font-black text-2xl text-[#D62828]">
                    {total.toFixed(2)}€
                  </span>
                </div>

                <motion.button
                  data-testid="checkout-button"
                  whileTap={{ scale: 0.98 }}
                  onClick={checkout}
                  className="w-full mt-6 bg-[#D62828] hover:bg-[#B31E1E] text-white font-bold py-4 rounded-xl transition-colors"
                >
                  Passer commande
                </motion.button>

                <div className="flex items-center gap-2 justify-center mt-4 text-zinc-400 text-xs">
                  <ShieldCheck className="h-4 w-4" /> Paiement 100% sécurisé
                </div>
              </div>

              <div className="flex items-start gap-3 mt-5 bg-[#D62828]/5 border border-[#D62828]/15 rounded-2xl p-5">
                <Heart className="h-5 w-5 fill-[#D62828] text-[#D62828] shrink-0 mt-0.5" />
                <p className="font-body text-sm text-zinc-600">
                  100% des bénéfices de la boutique sont reversés à nos programmes de terrain.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
