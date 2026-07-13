import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar, Share2, Facebook, Twitter, Linkedin, Quote } from "lucide-react";
import { toast } from "sonner";
import { BLOG_POSTS } from "@/data/content";

const buildBody = (post) => [
  { type: "p", text: post.excerpt },
  {
    type: "p",
    text: "Sur le terrain, chaque avancée est le fruit d'un travail patient, mené main dans la main avec les communautés. Nos équipes ne se contentent pas d'apporter une aide ponctuelle : elles construisent, avec les habitants, des solutions qui durent bien après leur départ.",
  },
  { type: "h2", text: "Un impact concret et mesurable" },
  {
    type: "p",
    text: "Derrière les chiffres, il y a des visages. Des familles qui accèdent enfin à l'eau potable, des enfants qui retournent à l'école, des mères qui accouchent en sécurité. C'est cette réalité, tangible et vérifiable, qui guide chacune de nos actions.",
  },
  {
    type: "quote",
    text: "« Ce n'est pas de la charité. C'est un investissement dans la dignité et l'autonomie de chacun. »",
    author: post.author,
  },
  {
    type: "p",
    text: "La transparence reste au cœur de notre démarche : chaque euro engagé est suivi, tracé et publié dans notre rapport annuel. Parce que la confiance se construit sur des preuves, pas sur des promesses.",
  },
  {
    type: "p",
    text: "Vous aussi, vous pouvez faire partie de cette histoire. Un don, un parrainage, un partage : chaque geste compte et prolonge l'impact sur le terrain.",
  },
];

export default function ArticleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find((p) => String(p.id) === String(id));

  if (!post) {
    return (
      <div data-testid="article-not-found" className="min-h-screen bg-[#FDFDFD] pt-40 pb-24 text-center px-6">
        <h1 className="font-heading font-extrabold text-4xl text-zinc-900">Article introuvable</h1>
        <p className="font-body text-zinc-500 mt-3">Cet article n&apos;existe pas ou a été déplacé.</p>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 bg-[#D62828] text-white font-bold px-6 py-3 rounded-full"
        >
          <ArrowLeft className="h-4 w-4" /> Retour au blog
        </Link>
      </div>
    );
  }

  const body = buildBody(post);
  const related = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);
  const share = () => toast("Partage", { description: "Maquette — à connecter sur Joomla." });

  return (
    <article data-testid="article-page" className="bg-[#FDFDFD]">
      {/* Hero */}
      <div className="relative pt-36 pb-16 md:pt-44 md:pb-24 bg-zinc-900 overflow-hidden">
        <img src={post.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-zinc-900/40" />
        <div className="relative max-w-3xl mx-auto px-5 md:px-10">
          <Link
            to="/blog"
            data-testid="back-to-blog"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Tous les articles
          </Link>
          <span className="inline-block bg-[#D62828] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
            {post.category}
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight mt-5"
          >
            {post.title}
          </motion.h1>
          <div className="flex flex-wrap items-center gap-4 mt-7 text-white/70 font-body text-sm">
            <span className="font-semibold text-white">Par {post.author}</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {post.readTime} de lecture
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-16 md:py-20">
        <div className="space-y-6">
          {body.map((b, i) => {
            if (b.type === "h2") {
              return (
                <h2 key={i} className="font-heading font-bold text-2xl md:text-3xl tracking-tight text-zinc-900 pt-4">
                  {b.text}
                </h2>
              );
            }
            if (b.type === "quote") {
              return (
                <blockquote key={i} className="border-l-4 border-[#D62828] pl-6 py-2 my-8">
                  <Quote className="h-8 w-8 text-[#D62828] mb-3" />
                  <p className="font-heading font-bold text-2xl md:text-3xl text-zinc-900 leading-snug tracking-tight">
                    {b.text}
                  </p>
                  <p className="font-body text-sm text-zinc-500 mt-3">— {b.author}</p>
                </blockquote>
              );
            }
            return (
              <p key={i} className={`font-body text-zinc-700 leading-relaxed ${i === 0 ? "text-xl md:text-2xl text-zinc-900 font-medium" : "text-lg"}`}>
                {b.text}
              </p>
            );
          })}
        </div>

        {/* Share */}
        <div className="flex items-center gap-4 mt-12 pt-8 border-t border-zinc-200">
          <span className="font-body font-bold text-zinc-900 flex items-center gap-2">
            <Share2 className="h-4 w-4" /> Partager
          </span>
          <div className="flex gap-2">
            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
              <button
                key={i}
                data-testid={`share-${i}`}
                onClick={share}
                aria-label="Partager l'article"
                className="h-10 w-10 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 hover:bg-[#D62828] hover:border-[#D62828] hover:text-white transition-colors"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate("/")}
            className="ml-auto bg-[#D62828] hover:bg-[#B31E1E] text-white font-bold text-sm px-6 py-3 rounded-full transition-colors"
          >
            Faire un don
          </button>
        </div>
      </div>

      {/* Related */}
      <section className="bg-[#F4F4F5] py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight text-zinc-900 mb-10">
            À lire aussi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p, i) => (
              <Link
                key={p.id}
                to={`/blog/${p.id}`}
                data-testid={`related-article-${i}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-5">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-zinc-900 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {p.category}
                  </span>
                </div>
                <p className="font-body text-sm text-zinc-500 mb-2">{p.date}</p>
                <h3 className="font-heading font-bold text-xl tracking-tight text-zinc-900 leading-snug group-hover:text-[#D62828] transition-colors">
                  {p.title}
                </h3>
                <span className="inline-flex items-center gap-2 mt-3 font-body font-bold text-sm text-zinc-900">
                  Lire la suite
                  <ArrowRight className="h-4 w-4 text-[#D62828] transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
