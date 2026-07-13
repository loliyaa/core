import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHero } from "@/components/sections/PageHero";
import { BLOG_POSTS } from "@/data/content";

export default function Blog() {
  const featured = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  const rest = BLOG_POSTS.filter((p) => p.id !== featured.id);
  const navigate = useNavigate();

  const read = (id) => navigate(`/blog/${id}`);

  return (
    <div data-testid="blog-page">
      <PageHero
        overline="Le blog"
        title="Histoires, terrain & transparence."
        text="Les récits de nos équipes, les analyses de fond et les nouvelles qui donnent du sens à votre engagement."
        image={BLOG_POSTS[0].image}
      />

      {/* Featured */}
      <section className="bg-[#FDFDFD] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <motion.article
            data-testid="blog-featured"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onClick={() => read(featured.id)}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center cursor-pointer mb-24"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-[#D62828] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                À la une
              </span>
            </div>
            <div>
              <div className="flex items-center gap-3 font-body text-sm text-zinc-500 mb-4">
                <span className="font-bold text-[#D62828] uppercase tracking-wider text-xs">
                  {featured.category}
                </span>
                <span>·</span>
                <span>{featured.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-zinc-900 group-hover:text-[#D62828] transition-colors">
                {featured.title}
              </h2>
              <p className="font-body text-lg text-zinc-600 mt-5 leading-relaxed">
                {featured.excerpt}
              </p>
              <p className="font-body text-sm text-zinc-500 mt-6">
                Par <span className="font-bold text-zinc-800">{featured.author}</span>
              </p>
              <span className="inline-flex items-center gap-2 mt-6 font-bold text-zinc-900">
                Lire l’article
                <ArrowRight className="h-4 w-4 text-[#D62828] transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </motion.article>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {rest.map((p, i) => (
              <motion.article
                key={p.id}
                data-testid={`blog-card-${i}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                onClick={() => read(p.id)}
                className="group cursor-pointer"
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
                <div className="flex items-center gap-3 font-body text-sm text-zinc-500 mb-2">
                  <span>{p.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {p.readTime}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl md:text-2xl tracking-tight text-zinc-900 leading-snug group-hover:text-[#D62828] transition-colors">
                  {p.title}
                </h3>
                <p className="font-body text-zinc-600 mt-3 leading-relaxed line-clamp-2">
                  {p.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 mt-4 font-body font-bold text-sm text-zinc-900">
                  Lire la suite
                  <ArrowRight className="h-4 w-4 text-[#D62828] transition-transform group-hover:translate-x-1" />
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
