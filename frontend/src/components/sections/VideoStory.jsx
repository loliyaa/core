import { motion } from "framer-motion";
import { Play, Quote } from "lucide-react";
import { useState } from "react";
import { VIDEO_POSTER } from "@/data/content";

export const VideoStory = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="histoire"
      data-testid="video-story-section"
      className="bg-[#FDFDFD] py-24 md:py-36"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="h-px w-10 bg-[#D62828]" />
          <span className="font-body text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-zinc-500">
            Histoire d&apos;impact
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] group bg-zinc-900"
          >
            {playing ? (
              <iframe
                data-testid="video-iframe"
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/YQHsXMglC9A?autoplay=1"
                title="Témoignage Cris du Cœur"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={VIDEO_POSTER}
                  alt="Réunion communautaire"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25" />
                <button
                  data-testid="video-play-button"
                  onClick={() => setPlaying(true)}
                  aria-label="Lire la vidéo témoignage"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.span
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-white flex items-center justify-center shadow-2xl"
                  >
                    <Play className="h-8 w-8 md:h-10 md:w-10 fill-[#D62828] text-[#D62828] ml-1" />
                  </motion.span>
                </button>
              </>
            )}
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <Quote className="h-12 w-12 text-[#D62828] mb-6" />
            <blockquote className="font-heading text-3xl md:text-4xl font-bold text-zinc-900 leading-snug tracking-tight">
              « Avant, marcher 3 heures pour de l&apos;eau. Aujourd&apos;hui, mes
              filles vont à l&apos;école. »
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[#D62828] flex items-center justify-center text-white font-heading font-bold">
                AK
              </div>
              <div>
                <p className="font-body font-bold text-zinc-900">Aïcha K.</p>
                <p className="font-body text-sm text-zinc-500">
                  Bénéficiaire du programme Eau &amp; Éducation, Mali
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
