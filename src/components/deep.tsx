"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Clock, Lock, MonitorSmartphone } from "lucide-react";

const ease = [0.25, 1, 0.4, 1] as const;

/* Kâğıt dokusu: tüm sayfaya çok hafif bir tane ekler */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] opacity-[0.07] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.33 0 0 0 0 0.3 0 0 0 0 0.29 0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}

/* Yavaşça süzülen renk bulutları */
function Mesh() {
  const reduce = useReducedMotion();
  const blobs = [
    { c: "#ecdcd9", s: "h-[46vw] w-[46vw] -left-[10vw] -top-[8vw]", a: { x: [0, 60, -20, 0], y: [0, 40, 80, 0] } },
    { c: "#dde4e0", s: "h-[40vw] w-[40vw] right-[-8vw] top-[10vw]", a: { x: [0, -50, 20, 0], y: [0, 60, -30, 0] } },
    { c: "#e4ddd0", s: "h-[34vw] w-[34vw] left-[30vw] bottom-[-12vw]", a: { x: [0, 40, -40, 0], y: [0, -40, 10, 0] } },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((b, i) => (
        <motion.div key={i} className={`absolute rounded-full blur-[90px] ${b.s}`} style={{ background: b.c }} animate={reduce ? undefined : b.a} transition={{ duration: 26 + i * 6, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

function BlurWords({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <motion.span key={i} className={`mr-[0.22em] inline-block ${className}`} initial={{ opacity: 0, filter: "blur(12px)", y: 14 }} animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} transition={{ duration: 1.6, delay: delay + i * 0.12, ease }}>
          {w}
        </motion.span>
      ))}
    </>
  );
}

/* Dönen yazı rozeti */
function Badge() {
  const t = "güvenli · yargısız · gizli · sana ait · ";
  return (
    <motion.svg viewBox="0 0 200 200" className="h-full w-full" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} aria-hidden="true">
      <defs>
        <path id="circ" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
      </defs>
      <text fontSize="15" letterSpacing="2" fill="#554e4b" style={{ fontFamily: "var(--font-dmsans)" }}>
        <textPath href="#circ" textLength="486" lengthAdjust="spacing">{t}</textPath>
      </text>
    </motion.svg>
  );
}

export function HeroDeep() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 }), sy = useSpring(my, { stiffness: 40, damping: 20 });
  const rx = useTransform(sx, (v) => v * 14), ry = useTransform(sy, (v) => v * 14);
  const rx2 = useTransform(sx, (v) => v * -22), ry2 = useTransform(sy, (v) => v * -22);

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative overflow-hidden px-5 pb-28 pt-32 sm:px-8 lg:min-h-[100svh] lg:pt-36"
    >
      <Mesh />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.2 }} className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-10 bg-earth/30" /> Psikolojik danışmanlık ve psikoterapi
          </motion.p>
          <h1 className="mt-8 font-serif text-[clamp(3.3rem,7.4vw,7.2rem)] font-light leading-[0.95] tracking-[-0.015em]">
            <BlurWords text="Kendine ayırdığın" delay={0.3} />
            <br />
            <BlurWords text="bir alan." className="italic text-rose" delay={0.7} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 1.2, ease }} className="mt-8 max-w-md text-lg leading-relaxed text-muted">
            Duygularını anlamak, kendini keşfetmek ve yaşam deneyimlerine farklı bir perspektiften bakmak için sakin, güvenli ve gizli bir görüşme alanı.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 1.4, ease }} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#iletisim" className="group inline-flex items-center justify-center gap-3 rounded-full bg-earth py-2 pl-7 pr-2 text-sm text-ivory transition hover:bg-earth-2">
              Ön görüşme için iletişim
              <span className="grid h-10 w-10 place-items-center rounded-full bg-rose text-earth-2 transition duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
              </span>
            </a>
            <a href="#yaklasim" className="inline-flex items-center justify-center rounded-full border border-earth/25 px-7 py-4 text-sm transition hover:border-earth">
              Çalışma yaklaşımım
            </a>
          </motion.div>
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 1.7 }} className="mt-14 grid max-w-lg grid-cols-3 gap-4 border-t border-earth/15 pt-6 text-sm">
            {[
              [Clock, "50 dakikalık", "görüşmeler"],
              [MonitorSmartphone, "Yüz yüze", "ve çevrim içi"],
              [Lock, "Gizlilik", "esaslı süreç"],
            ].map(([I, a, b]) => {
              const Icon = I as typeof Clock;
              return (
                <li key={a as string}>
                  <Icon className="h-5 w-5 text-rose" strokeWidth={1.3} />
                  <p className="mt-3 font-serif text-xl leading-tight">{a as string}</p>
                  <p className="text-muted">{b as string}</p>
                </li>
              );
            })}
          </motion.ul>
        </div>

        {/* katmanlı fotoğraf kompozisyonu */}
        <div className="relative mx-auto h-[520px] w-full max-w-[560px] sm:h-[640px] lg:col-span-6">
          <motion.div style={{ y: y1, x: rx, rotate: 0 }} className="absolute right-0 top-0 h-[86%] w-[74%]">
            <motion.div initial={{ clipPath: "inset(100% 0 0 0 round 999px 999px 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0 round 999px 999px 0 0)" }} transition={{ duration: 2, delay: 0.2, ease }} className="relative h-full w-full overflow-hidden rounded-t-full shadow-[0_40px_80px_-40px_rgba(85,78,75,0.5)]">
              <motion.div initial={{ scale: 1.3 }} animate={{ scale: 1 }} transition={{ duration: 3, delay: 0.2, ease }} className="absolute inset-0">
                <Image src="/images/armchair-room.jpg" alt="Doğal ışık alan sakin bir oda" fill priority sizes="(min-width:1024px) 34vw, 74vw" className="object-cover" />
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div style={{ y: y2, x: rx2 }} className="absolute bottom-0 left-0 h-[46%] w-[46%]">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, delay: 0.9, ease }} className="relative h-full w-full overflow-hidden rounded-[48%_52%_44%_56%/55%_45%_55%_45%] border-[10px] border-ivory shadow-[0_30px_60px_-30px_rgba(85,78,75,0.6)]">
              <Image src="/images/plant-sun.jpg" alt="Güneş ışığında bir bitki" fill sizes="25vw" className="object-cover" />
            </motion.div>
          </motion.div>
          <motion.div style={{ y: y3 }} className="absolute -left-2 top-10 h-32 w-32 sm:h-40 sm:w-40">
            <div className="relative h-full w-full rounded-full bg-ivory/80 backdrop-blur">
              <Badge />
              <span className="absolute inset-0 grid place-items-center font-serif text-4xl italic text-rose">iç</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 1.8, ease }} style={{ x: rx2, y: ry }} className="absolute bottom-16 right-2 max-w-[240px] rounded-[1.75rem] border border-white/60 bg-white/70 p-5 shadow-[0_30px_60px_-30px_rgba(85,78,75,0.5)] backdrop-blur-xl sm:right-[-12px]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted">Kendine bir soru</p>
            <p className="mt-2 font-serif text-2xl italic leading-tight">Şu an neye ihtiyacım var?</p>
          </motion.div>
          <motion.span style={{ x: rx, y: ry2 }} className="absolute right-[40%] top-[-10px] h-4 w-4 rounded-full bg-rose" />
          <motion.span style={{ x: rx2, y: ry }} className="absolute bottom-[48%] right-[-6px] h-3 w-3 rounded-full bg-sage" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Görüşme odası: yatay kayan galeri ---------------- */
const rooms = [
  { img: "/images/garden-window.jpg", t: "Doğal ışık", d: "Bahçeye bakan, gün ışığı alan sakin bir oda." },
  { img: "/images/chairs-window.jpg", t: "Nefes alan bir alan", d: "Bitkilerle çevrili, sade ve ferah bir düzen." },
  { img: "/images/monstera-chair.jpg", t: "Rahat bir koltuk", d: "Kendini rahat hissedebileceğin bir oturma alanı." },
  { img: "/images/blinds.jpg", t: "Sessizlik", d: "Dış dünyanın gürültüsünden uzak, korunaklı bir ortam." },
  { img: "/images/plant-sun.jpg", t: "Sana ayrılan zaman", d: "Elli dakika boyunca yalnızca sen ve senin gündemin." },
];

function RoomCard({ r, i, p }: { r: (typeof rooms)[number]; i: number; p: MotionValue<number> }) {
  const y = useTransform(p, [0, 1], [i % 2 ? 40 : -20, i % 2 ? -40 : 20]);
  return (
    <motion.figure style={{ y }} className="group relative h-[64vh] w-[min(380px,72vw)] shrink-0 overflow-hidden rounded-[2rem] lg:w-[30vw]">
      <Image src={r.img} alt={r.t} fill sizes="(min-width:1024px) 30vw, 72vw" className="object-cover transition duration-[1.6s] group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-earth-2/80 via-earth-2/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-7 text-ivory">
        <span className="font-serif text-lg italic text-rose-soft">0{i + 1}</span>
        <p className="mt-1 font-serif text-3xl">{r.t}</p>
        <p className="mt-2 max-w-xs text-sm text-ivory/75">{r.d}</p>
      </figcaption>
    </motion.figure>
  );
}

export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  return (
    <>
      <section ref={ref} className="relative hidden h-[300vh] bg-ivory-2 lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex items-center gap-8 pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-[10vw]">
            <div className="w-[30vw] shrink-0 pr-6">
              <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-muted">Görüşme odası</p>
              <h2 className="font-serif text-[clamp(2.6rem,4.6vw,4.6rem)] font-light leading-[1]">
                Kendini
                <br />
                <em className="text-rose">evinde hisset.</em>
              </h2>
              <p className="mt-6 max-w-sm text-muted">Görüşmelerin geçtiği alan da sürecin bir parçasıdır. Sakin, aydınlık ve korunaklı bir oda.</p>
            </div>
            {rooms.map((r, i) => (
              <RoomCard key={r.t} r={r} i={i} p={scrollYProgress} />
            ))}
          </motion.div>
        </div>
      </section>
      <section className="bg-ivory-2 py-24 lg:hidden">
        <div className="px-5 sm:px-8">
          <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-muted">Görüşme odası</p>
          <h2 className="font-serif text-[clamp(2.6rem,9vw,4rem)] font-light leading-[1]">
            Kendini <em className="text-rose">evinde hisset.</em>
          </h2>
        </div>
        <div data-lenis-prevent className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:none]">
          {rooms.map((r, i) => (
            <figure key={r.t} className="relative h-[420px] w-[78vw] max-w-[360px] shrink-0 snap-start overflow-hidden rounded-[2rem]">
              <Image src={r.img} alt={r.t} fill sizes="78vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-2/80 via-transparent to-transparent" />
              <figcaption className="absolute bottom-0 p-6 text-ivory">
                <span className="font-serif italic text-rose-soft">0{i + 1}</span>
                <p className="font-serif text-2xl">{r.t}</p>
                <p className="mt-1 text-sm text-ivory/75">{r.d}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}

/* ---------------- Çalışma alanları: fotoğraflı kutu ızgarası ---------------- */
const areaCards = [
  { t: "Bireysel terapi", d: "Kaygı, stres, yas, ilişki güçlükleri ve yaşam geçişleri gibi konularda bireysel görüşmeler.", img: "/images/monstera-chair.jpg", span: "lg:col-span-7 lg:row-span-2", h: "h-[440px] lg:h-full" },
  { t: "Çift ve aile", d: "İletişim, uyum ve ilişki dinamikleri üzerine görüşmeler.", img: "/images/chairs-window.jpg", span: "lg:col-span-5", h: "h-[300px]" },
  { t: "Ergen", d: "Ergenlik döneminin duygusal ve sosyal süreçlerine yönelik, aileyle iş birliği içinde.", img: "/images/garden-window.jpg", span: "lg:col-span-5", h: "h-[300px]" },
  { t: "Çevrim içi görüşme", d: "Uygun koşullarda, güvenli bir bağlantı üzerinden görüntülü görüşme imkânı.", img: "/images/armchair-room.jpg", span: "lg:col-span-12", h: "h-[260px]" },
];

export function AreasDeep() {
  return (
    <section id="alanlar" className="px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-muted">Çalışma alanları</p>
            <h2 className="font-serif text-[clamp(2.6rem,5vw,4.6rem)] font-light leading-[1]">
              Sana uygun
              <br />
              <em className="text-rose">destek.</em>
            </h2>
          </div>
          <p className="max-w-sm text-muted">Her görüşme süreci, kişinin ihtiyacına ve hedeflerine göre birlikte şekillenir.</p>
        </div>
        <div className="mt-16 grid gap-4 lg:grid-cols-12 lg:grid-rows-[300px_300px]">
          {areaCards.map((a, i) => (
            <motion.article key={a.t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1.4, delay: i * 0.1, ease }} className={`group relative overflow-hidden rounded-[2rem] ${a.span} ${a.h}`}>
              <Image src={a.img} alt={a.t} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover transition duration-[1.8s] ease-out group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-2/85 via-earth-2/25 to-transparent transition duration-700 group-hover:from-earth-2/90" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 text-ivory sm:p-9">
                <div>
                  <span className="font-serif text-lg italic text-rose-soft">0{i + 1}</span>
                  <h3 className="mt-1 font-serif text-[2.2rem] leading-none sm:text-5xl">{a.t}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/75 transition duration-700 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">{a.d}</p>
                </div>
                <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-ivory/40 transition duration-700 group-hover:rotate-45 group-hover:bg-ivory group-hover:text-earth sm:grid">
                  <ArrowUpRight className="h-5 w-5" strokeWidth={1.4} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Tam ekran alıntı ---------------- */
export function QuoteBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const words = "Değişim, kendine merakla bakabildiğin ilk anda başlar.".split(" ");
  return (
    <section ref={ref} className="relative grid min-h-[90vh] place-items-center overflow-hidden px-5 py-32 text-ivory sm:px-8">
      <motion.div style={{ y }} className="absolute inset-[-15%_0]">
        <Image src="/images/reading.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-earth-2/55" />
      <div className="relative mx-auto max-w-5xl text-center">
        <span className="font-serif text-8xl leading-none text-rose">“</span>
        <p className="font-serif text-[clamp(2.2rem,5.4vw,5rem)] font-light leading-[1.1]">
          {words.map((w, i) => (
            <motion.span key={i} className="mr-[0.22em] inline-block" initial={{ opacity: 0, filter: "blur(10px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 1.4, delay: i * 0.12 }}>
              {i >= words.length - 3 ? <em className="text-rose-soft">{w}</em> : w}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
}
