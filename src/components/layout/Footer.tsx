import { motion } from "motion/react";
import {
  Github,
  Twitter,
  Instagram,
  Mail,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="
        py-12 sm:py-16 md:py-20
        px-4 sm:px-6 md:px-8
        max-w-[1400px]
        mx-auto
      "
    >
      <div
        className="
          grid
          lg:grid-cols-2
          gap-12
          md:gap-16
          lg:gap-24
          items-start
        "
      >
        {/* LEFT */}
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-6 md:space-y-8">
            <span className="text-brand-accent font-mono font-bold tracking-[0.4em] uppercase text-[10px] block">
              — PROJECT DISPATCH
            </span>

            <h2
              className="
                font-display
                font-bold
                leading-[0.9]
                tracking-tighter
                uppercase
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                xl:text-8xl
              "
            >
              HAVE A
              <br />
              NEW{" "}
              <span className="italic text-studio-text/40">
                VISION?
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-studio-text/40">
              Direct Communication
            </span>

            <a
              href="mailto:umangkumar622@gmail.com"
              className="
                block
                font-display
                font-bold
                hover:text-brand-accent
                transition-colors
                text-xl
                sm:text-2xl
                md:text-3xl
                lg:text-4xl
                break-all
              "
            >
              umangkumar622@gmail.com
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-10
            md:gap-12
            pt-10
            md:pt-16
            lg:pt-24
            border-t
            border-studio-border
          "
        >
          {/* SOCIAL */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest">
              Network
            </span>

            <div className="flex gap-4">
              {[
                { Icon: Github, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Mail, href: "#" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor:
                      "var(--color-brand-accent)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    w-11 h-11
                    sm:w-12 sm:h-12
                    border
                    border-studio-border
                    flex
                    items-center
                    justify-center
                    text-studio-text/40
                    hover:text-white
                    hover:border-brand-accent
                    transition-colors
                    duration-300
                  "
                >
                  <social.Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* OFFICE */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest">
              Office
            </span>

            <div className="flex flex-col gap-2 font-display font-medium text-studio-text/40 text-sm">
              <p>Delhi</p>
              <p>India</p>
              <p>Remote Worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        className="
          mt-10
          pt-10
          md:pt-12
          border-t
          border-studio-border

          flex
          flex-col
          lg:flex-row

          justify-between
          items-center

          gap-6
          md:gap-8

          text-center
          lg:text-left
        "
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-studio-text flex items-center justify-center">
            <span className="font-display font-bold text-white text-xs">
              U
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-studio-text/40">
            © 2026 VISIONS — Creative Collective
          </span>
        </div>

        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-3
            sm:gap-8
            lg:gap-12

            italic
            text-[10px]
            font-mono
            font-bold
            text-studio-text/20
            uppercase
            tracking-widest
          "
        >
          <span>Architecting Perception</span>
          <span>Digital Permanence</span>
        </div>

        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="
            group
            flex
            items-center
            justify-center
            gap-3

            text-[10px]
            font-bold
            uppercase
            tracking-widest

            text-studio-text/40
            hover:text-brand-accent

            transition-colors
          "
        >
          Back to Top

          <ArrowRight
            className="-rotate-90 transition-transform group-hover:-translate-y-1"
            size={14}
          />
        </button>
      </div>
    </footer>
  );
}