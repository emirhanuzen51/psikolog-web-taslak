"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { ArrowUpRight, Lock, Menu, Pause, Play, Plus, ShieldCheck, Trash2, X } from "lucide-react";
import { approaches, areas, faqs, journey, moods, pro } from "@/lib/data";

const ease = [0.25, 1, 0.4, 1] as const; // yumuşak, yavaş

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.4 });
    let id = 0;
    const r = (t: number) => {
      l.raf(t);
      id = requestAnimationFrame(r);
    };
    id = requestAnimationFrame(r);
    return () => {
      cancelAnimationFrame(id);
      l.destroy();
    };
  }, []);
  return null;
}

function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1.4, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

function Kicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`mb-6 text-[11px] uppercase tracking-[0.3em] ${light ? "text-ivory/60" : "text-muted"}`}>{children}</p>;
}

/* ---------------- Organik form (Catmull-Rom → kübik Bezier; aynı yapı → yumuşak dönüşüm) ---------------- */
function blob(seed: number, n = 8, r = 100, cx = 120, cy = 120, wobble = 0.16) {
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + wobble * Math.sin(seed * 1.7 + i * 2.3) + wobble * 0.6 * Math.cos(seed * 0.9 + i * 1.1);
    pts.push([cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k]);
  }
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}

function Blob({ seeds, duration = 18, className = "", fill = "currentColor" }: { seeds: number[]; duration?: number; className?: string; fill?: string }) {
  const reduce = useReducedMotion();
  const shapes = seeds.map((s) => blob(s));
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true">
      <motion.path d={shapes[0]} fill={fill} animate={reduce ? undefined : { d: [...shapes, shapes[0]] }} transition={{ duration, repeat: Infinity, ease: "easeInOut" }} />
    </svg>
  );
}

/* ---------------- Logo + menü ---------------- */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 font-serif text-[1.7rem] italic leading-none ${light ? "text-ivory" : "text-earth"}`}>
      <Blob seeds={[1, 4]} duration={14} className="h-7 w-7 text-rose" />
      psikolog.
      <span className={`not-italic font-sans text-[10px] uppercase tracking-[0.26em] ${light ? "text-ivory/60" : "text-muted"}`}>Danışmanlık</span>
    </span>
  );
}

const nav = [
  { h: "#yaklasim", l: "Yaklaşımım" },
  { h: "#alanlar", l: "Çalışma Alanları" },
  { h: "#nefes", l: "Nefes" },
  { h: "#sss", l: "SSS" },
];

export function Header() {
  const [s, setS] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setS(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${s ? "bg-ivory/85 backdrop-blur-xl" : ""}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="#top" aria-label="Ana sayfa">
            <Logo />
          </a>
          <nav className="hidden items-center gap-9 text-sm text-earth/70 lg:flex">
            {nav.map((n) => (
              <a key={n.h} href={n.h} className="transition-colors hover:text-earth">
                {n.l}
              </a>
            ))}
            <a href="#iletisim" className="rounded-full border border-earth/25 px-5 py-2.5 text-earth transition hover:border-earth hover:bg-earth hover:text-ivory">
              İletişim
            </a>
          </nav>
          <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full border border-earth/20 lg:hidden" aria-label="Menüyü aç">
            <Menu className="h-5 w-5" strokeWidth={1.4} />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="fixed inset-0 z-[60] flex flex-col bg-ivory px-6 pb-10 pt-5">
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-earth/20" aria-label="Menüyü kapat">
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>
            <nav className="mt-16 grid">
              {[...nav, { h: "#iletisim", l: "İletişim" }].map((n, i) => (
                <motion.a key={n.h} href={n.h} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07, duration: 0.8 }} className="border-b border-earth/10 py-4 font-serif text-4xl italic">
                  {n.l}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Giriş: organik formun içinde fotoğraf ---------------- */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const shapes = [2, 5, 9, 13].map((s) => blob(s, 8, 104, 120, 120, 0.12));

  return (
    <section id="top" ref={ref} className="relative overflow-hidden px-5 pb-24 pt-32 sm:px-8 lg:min-h-[100svh] lg:pt-36">
      <Blob seeds={[3, 7, 11]} duration={24} className="pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] text-sage-soft" />
      <Blob seeds={[6, 10, 2]} duration={28} className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] text-rose-soft" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.2 }}>
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted">Psikolojik danışmanlık ve psikoterapi</span>
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8, delay: 0.35, ease }} className="mt-7 font-serif text-[clamp(3.2rem,7vw,6.6rem)] font-light leading-[0.98] tracking-[-0.01em]">
            Kendine ayırdığın
            <br />
            <em className="text-rose">bir alan.</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.9 }} className="mt-8 max-w-md text-lg leading-relaxed text-muted">
            Duygularını anlamak, kendini keşfetmek ve yaşam deneyimlerine farklı bir perspektiften bakmak için güvenli bir görüşme alanı.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 1.2 }} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#yaklasim" className="inline-flex items-center justify-center gap-2 rounded-full bg-earth px-7 py-4 text-sm text-ivory transition hover:bg-earth-2">
              Çalışma yaklaşımım <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <a href="#hakkimda" className="inline-flex items-center justify-center rounded-full border border-earth/25 px-7 py-4 text-sm transition hover:border-earth">
              Hakkımda
            </a>
          </motion.div>
        </div>
        <motion.div style={{ y }} className="relative mx-auto w-full max-w-[540px] lg:col-span-6">
          <motion.svg initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2.2, ease }} viewBox="0 0 240 240" className="w-full" role="img" aria-label="Doğal ışık alan sakin bir oda">
            <defs>
              <clipPath id="hero-blob">
                <motion.path d={shapes[0]} animate={reduce ? undefined : { d: [...shapes, shapes[0]] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
              </clipPath>
            </defs>
            <image href="/images/armchair-room.jpg" x="0" y="0" width="240" height="240" preserveAspectRatio="xMidYMid slice" clipPath="url(#hero-blob)" />
          </motion.svg>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 1.2 }} className="absolute -bottom-2 left-2 flex items-center gap-3 rounded-full bg-white/80 px-5 py-3 shadow-sm backdrop-blur sm:left-6">
            <Lock className="h-4 w-4 text-sage" strokeWidth={1.5} />
            <span className="text-sm">Gizlilik ve güven önceliğimizdir</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Yaklaşım ---------------- */
export function Approach() {
  return (
    <section id="yaklasim" className="px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <Fade>
          <Blob seeds={[8, 12]} duration={16} className="mx-auto h-14 w-14 text-sage" />
          <p className="mt-10 font-serif text-[clamp(2rem,4.2vw,3.6rem)] font-light leading-[1.2]">
            Her insanın hikâyesi kendine özgüdür. Görüşmelerde amacım; seni yargılamadan dinlemek, birlikte anlamak ve <em className="text-rose">kendi yolunu bulmana</em> eşlik etmektir.
          </p>
        </Fade>
      </div>
      <div className="mx-auto mt-24 grid max-w-6xl gap-px overflow-hidden rounded-[2rem] bg-earth/10 md:grid-cols-3">
        {approaches.map((a, i) => (
          <Fade key={a.t} delay={i * 0.1} className="bg-ivory p-9">
            <span className="font-serif text-5xl italic text-moss">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-6 font-serif text-3xl">{a.t}</h3>
            <p className="mt-3 text-muted">{a.d}</p>
          </Fade>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Çalışma alanları ---------------- */
export function Areas() {
  return (
    <section id="alanlar" className="bg-ivory-2 px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker>Çalışma alanları</Kicker>
          <Fade>
            <h2 className="font-serif text-[clamp(2.6rem,5vw,4.6rem)] font-light leading-[1]">
              Sana uygun
              <br />
              <em className="text-rose">destek.</em>
            </h2>
          </Fade>
          <Fade delay={0.2}>
            <div className="relative mt-12 aspect-[4/5] overflow-hidden rounded-[45%_55%_48%_52%/52%_45%_55%_48%]">
              <Image src="/images/monstera-chair.jpg" alt="Bitkili, sakin bir görüşme odası" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </Fade>
        </div>
        <div className="grid content-center gap-4 lg:col-span-7">
          {areas.map((a, i) => (
            <Fade key={a.t} delay={i * 0.1}>
              <article className="group flex gap-6 rounded-[2rem] bg-ivory p-8 transition duration-700 hover:bg-white">
                <Blob seeds={[i + 2, i + 6]} duration={12 + i * 2} className="h-14 w-14 shrink-0" fill={a.c} />
                <div>
                  <h3 className="font-serif text-3xl">{a.t}</h3>
                  <p className="mt-2 text-muted">{a.d}</p>
                </div>
              </article>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Nefes egzersizi ---------------- */
const phases = [
  { k: "Nefes al", s: 4, scale: 1 },
  { k: "Tut", s: 4, scale: 1 },
  { k: "Nefes ver", s: 6, scale: 0.55 },
];

export function Breath() {
  const [run, setRun] = useState(false);
  const [i, setI] = useState(2);
  const [left, setLeft] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => {
      setLeft((l) => {
        if (l > 1) return l - 1;
        setI((p) => {
          const n = (p + 1) % phases.length;
          if (n === 0) setCycles((c) => c + 1);
          setLeft(phases[n].s);
          return n;
        });
        return 0;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [run]);

  const start = () => {
    setI(0);
    setLeft(phases[0].s);
    setCycles(0);
    setRun(true);
  };
  const ph = phases[i];
  const scale = run ? ph.scale : 0.55;

  return (
    <section id="nefes" className="relative overflow-hidden bg-earth px-5 py-28 text-ivory sm:px-8 lg:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker light>Bir an dur</Kicker>
          <h2 className="font-serif text-[clamp(2.6rem,5vw,4.6rem)] font-light leading-[1]">
            Nefesine
            <br />
            <em className="text-rose">alan aç.</em>
          </h2>
          <p className="mt-6 max-w-md text-ivory/70">İsteğe bağlı kısa bir nefes farkındalığı egzersizi. Daire genişlerken nefes al, sabit kalırken tut, küçülürken yavaşça ver.</p>
          <div className="mt-10 flex items-center gap-4">
            {!run ? (
              <button onClick={start} className="inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-4 text-sm text-earth transition hover:bg-white">
                <Play className="h-4 w-4" strokeWidth={1.6} /> Başla
              </button>
            ) : (
              <button onClick={() => setRun(false)} className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-7 py-4 text-sm transition hover:bg-ivory/10">
                <Pause className="h-4 w-4" strokeWidth={1.6} /> Durdur
              </button>
            )}
            <span className="text-sm text-ivory/60">{cycles > 0 ? `${cycles} tur tamamlandı` : "4 · 4 · 6 ritmi"}</span>
          </div>
          <p className="mt-8 text-xs leading-relaxed text-ivory/45">Bu egzersiz bir terapi veya tedavi yöntemi yerine geçmez. Rahatsızlık hissedersen bırakıp normal nefesine dönebilirsin.</p>
        </div>
        <div className="grid place-items-center lg:col-span-7">
          <div className="relative grid h-[320px] w-[320px] place-items-center sm:h-[420px] sm:w-[420px]">
            <div className="absolute inset-0 rounded-full border border-ivory/10" />
            <div className="absolute inset-[22%] rounded-full border border-dashed border-ivory/15" />
            <motion.div animate={{ scale }} transition={{ duration: run ? ph.s : 1.2, ease: "easeInOut" }} className="absolute inset-0">
              <Blob seeds={[1, 3, 5]} duration={10} className="h-full w-full text-rose/80" />
            </motion.div>
            <motion.div animate={{ scale: scale * 0.8 }} transition={{ duration: run ? ph.s : 1.2, ease: "easeInOut" }} className="absolute inset-[12%]">
              <Blob seeds={[4, 8, 2]} duration={12} className="h-full w-full text-sage/70" />
            </motion.div>
            <div className="relative text-center" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p key={run ? `${i}` : "idle"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="font-serif text-4xl italic">
                  {run ? ph.k : "Hazır olduğunda"}
                </motion.p>
              </AnimatePresence>
              {run && <p className="mt-1 text-sm text-ivory/70">{left}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Terapi süreci yolculuğu ---------------- */
export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref, { once: true, margin: "-20%" });
  return (
    <section className="px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <Kicker>Süreç nasıl ilerler?</Kicker>
        <Fade>
          <h2 className="font-serif text-[clamp(2.6rem,5vw,4.6rem)] font-light leading-[1]">
            İlk adımdan
            <br />
            <em className="text-rose">düzenli görüşmelere.</em>
          </h2>
        </Fade>
        <div ref={ref} className="relative mt-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute inset-x-0 top-8 hidden h-24 w-full md:block" aria-hidden="true">
            <motion.path d="M0 60 C150 0 300 120 450 60 S750 0 900 60 S1100 120 1200 60" stroke="#c99f9c" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} animate={v ? { pathLength: 1 } : undefined} transition={{ duration: 3, ease: "easeInOut" }} />
          </svg>
          <ol className="relative grid gap-10 md:grid-cols-4">
            {journey.map((j, i) => (
              <Fade key={j.t} delay={0.4 + i * 0.25}>
                <li>
                  <span className="relative grid h-20 w-20 place-items-center">
                    <Blob seeds={[i + 1, i + 5]} duration={14} className="absolute inset-0 h-full w-full text-ivory-2" />
                    <span className="relative font-serif text-3xl italic">{i + 1}</span>
                  </span>
                  <h3 className="mt-6 font-serif text-3xl">{j.t}</h3>
                  <p className="mt-2 text-muted">{j.d}</p>
                </li>
              </Fade>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Duygu günlüğü (yalnızca bu cihazda) ---------------- */
type Entry = { id: number; mood: string; note: string; date: number };
const KEY = "inner-space-journal";

export function Journal() {
  const [mood, setMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [list, setList] = useState<Entry[]>([]);
  useEffect(() => {
    try {
      setList(JSON.parse(localStorage.getItem(KEY) || "[]"));
    } catch {}
  }, []);
  const save = (next: Entry[]) => {
    setList(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };
  const add = () => {
    if (!mood) return;
    save([{ id: Date.now(), mood, note: note.trim().slice(0, 280), date: Date.now() }, ...list].slice(0, 30));
    setNote("");
    setMood(null);
  };
  return (
    <section className="bg-sage-soft px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker>Kendinle bir an</Kicker>
          <Fade>
            <h2 className="font-serif text-[clamp(2.6rem,5vw,4.6rem)] font-light leading-[1]">
              Bugün
              <br />
              <em className="text-rose">nasıl hissediyorsun?</em>
            </h2>
          </Fade>
          <p className="mt-6 max-w-md text-muted">Duygularını fark etmek için küçük bir günlük. İstersen bir duygu seç ve kısa bir not bırak.</p>
          <p className="mt-6 flex items-start gap-3 rounded-2xl bg-ivory p-4 text-sm">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sage" strokeWidth={1.5} />
            Notların yalnızca bu cihazdaki tarayıcında saklanır; sunucuya gönderilmez ve kimseyle paylaşılmaz.
          </p>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-[2rem] bg-ivory p-7 sm:p-10">
            <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Duygu seçimi">
              {moods.map((m) => (
                <button key={m.id} role="radio" aria-checked={mood === m.id} onClick={() => setMood(m.id)} className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition ${mood === m.id ? "border-earth bg-white" : "border-earth/15 hover:border-earth/40"}`}>
                  <span className="h-3 w-3 rounded-full" style={{ background: m.c }} /> {m.label}
                </button>
              ))}
            </div>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} maxLength={280} placeholder="Kısa bir not (isteğe bağlı)" className="mt-5 w-full resize-none rounded-2xl border border-earth/15 bg-white/60 p-4 outline-none transition placeholder:text-muted/60 focus:border-earth/40" />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted">{note.length}/280</span>
              <button onClick={add} disabled={!mood} className="rounded-full bg-earth px-6 py-3 text-sm text-ivory transition hover:bg-earth-2 disabled:opacity-30">
                Kaydet
              </button>
            </div>
            {list.length > 0 && (
              <div className="mt-8 border-t border-earth/10 pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">Son notların</p>
                  <button onClick={() => save([])} className="flex items-center gap-1.5 text-xs text-muted hover:text-earth">
                    <Trash2 className="h-3.5 w-3.5" /> Tümünü sil
                  </button>
                </div>
                <ul className="mt-4 grid gap-3">
                  <AnimatePresence initial={false}>
                    {list.slice(0, 5).map((e) => {
                      const m = moods.find((x) => x.id === e.mood);
                      return (
                        <motion.li key={e.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex gap-3 rounded-2xl bg-white/70 p-4 text-sm">
                          <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ background: m?.c }} />
                          <span>
                            <b className="font-medium">{m?.label}</b> · <span className="text-muted">{new Date(e.date).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}</span>
                            {e.note && <span className="mt-1 block text-muted">{e.note}</span>}
                          </span>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Hakkımda ---------------- */
export function About() {
  return (
    <section id="hakkimda" className="px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12">
        <Fade className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full">
            <Image src="/images/garden-window.jpg" alt="Bahçeye bakan pencere kenarında bir koltuk" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </Fade>
        <div className="lg:col-span-7">
          <Kicker>Hakkımda</Kicker>
          <Fade>
            <h2 className="font-serif text-[clamp(2.6rem,5vw,4.6rem)] font-light leading-[1]">
              {pro.name}
              <br />
              <em className="text-rose">{pro.title}</em>
            </h2>
          </Fade>
          <Fade delay={0.2}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">Psikoloji lisans eğitiminin ardından yetişkinler, çiftler ve ergenlerle çalışmaktadır. Görüşmelerde güvenli, saygılı ve yargısız bir ilişkiyi temel alır; her kişinin kendi hızına ve ihtiyacına uygun bir süreç yürütür.</p>
          </Fade>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] bg-earth/10 sm:grid-cols-3">
            {[
              ["Eğitim", "Psikoloji (Lisans)"],
              ["Görüşme dili", "Türkçe"],
              ["Görüşme biçimi", "Yüz yüze · Çevrim içi"],
            ].map(([k, v]) => (
              <div key={k} className="bg-ivory p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{k}</p>
                <p className="mt-1 font-serif text-xl">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SSS ---------------- */
export function Faq() {
  const [o, setO] = useState<number | null>(0);
  return (
    <section id="sss" className="bg-ivory-2 px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-4xl">
        <Kicker>Sıkça sorulanlar</Kicker>
        <h2 className="font-serif text-[clamp(2.6rem,5vw,4.6rem)] font-light leading-[1]">
          Aklındaki <em className="text-rose">sorular.</em>
        </h2>
        <div className="mt-12">
          {faqs.map((f, i) => (
            <div key={f.q} className="border-b border-earth/15">
              <button onClick={() => setO(o === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={o === i}>
                <span className="font-serif text-2xl">{f.q}</span>
                <motion.span animate={{ rotate: o === i ? 45 : 0 }} transition={{ duration: 0.6, ease }}>
                  <Plus className="h-5 w-5" strokeWidth={1.3} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {o === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.7, ease }} className="overflow-hidden">
                    <p className="pb-6 text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- İletişim + alt bilgi ---------------- */
export function Contact() {
  return (
    <section id="iletisim" className="relative overflow-hidden px-5 py-28 sm:px-8 lg:py-40">
      <Blob seeds={[2, 9, 4]} duration={26} className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] text-rose-soft" />
      <div className="relative mx-auto max-w-5xl">
        <Kicker>İletişim</Kicker>
        <h2 className="font-serif text-[clamp(2.8rem,6vw,5.4rem)] font-light leading-[1]">
          İlk adım için
          <br />
          <em className="text-rose">buradayım.</em>
        </h2>
        <p className="mt-6 max-w-lg text-muted">Randevu ve bilgi için aşağıdaki kanallardan ulaşabilirsin. Gizliliğin için ilk mesajında kişisel sağlık bilgilerini paylaşmamanı öneririm; bunları görüşmede konuşabiliriz.</p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] bg-earth/10 sm:grid-cols-2">
          {[
            ["Telefon", pro.phoneDisplay, pro.phoneHref],
            ["E-posta", pro.email, `mailto:${pro.email}`],
            ["Adres", pro.address, null],
            ["Görüşme saatleri", pro.hours, null],
          ].map(([k, v, h]) => (
            <div key={k} className="bg-ivory p-7">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{k}</p>
              {h ? (
                <a href={h} className="mt-1 block font-serif text-2xl hover:text-rose">{v}</a>
              ) : (
                <p className="mt-1 font-serif text-2xl">{v}</p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-2xl border border-rose/40 bg-rose-soft/60 p-5 text-sm">
          <b className="font-medium">Acil bir durumdaysan</b> veya kendine ya da bir başkasına zarar verme düşüncen varsa lütfen beklemeden <b className="font-medium">112</b>&apos;yi ara veya en yakın acil servise başvur.
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-5 pb-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-earth/15 pt-8 text-sm text-muted md:flex-row">
        <div>
          <Logo />
          <p className="mt-3 max-w-md text-xs leading-relaxed">
            Sitedeki içerikler genel bilgilendirme amaçlıdır; psikolojik değerlendirme veya tedavi yerine geçmez. Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Faaliyetleri Hakkında Yönetmelik gözetilerek hazırlanmıştır.
          </p>
        </div>
        <div className="flex gap-6">
          <Link href="/kvkk" className="hover:text-earth">KVKK</Link>
          <span>© {new Date().getFullYear()} Psikolog Web Taslağı</span>
        </div>
      </div>
    </footer>
  );
}
