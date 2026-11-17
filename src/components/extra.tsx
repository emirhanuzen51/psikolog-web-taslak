"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Ear, Eye, Hand, HeartHandshake, Lock, Coffee, RotateCcw, Scale, Sparkles, UserCheck, Wind } from "lucide-react";

const ease = [0.25, 1, 0.4, 1] as const;

function Kicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`mb-6 text-[11px] uppercase tracking-[0.3em] ${light ? "text-ivory/60" : "text-muted"}`}>{children}</p>;
}

function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1.4, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

/* ---------------- 5-4-3-2-1 farkındalık egzersizi ---------------- */
const senses = [
  { n: 5, I: Eye, t: "şey gör", d: "Etrafına bak ve görebildiğin beş şeyi sessizce say. Renklerine, şekillerine dikkat et." },
  { n: 4, I: Hand, t: "şeye dokun", d: "Dokunabildiğin dört şeyi fark et: oturduğun yüzey, kıyafetinin dokusu, ellerin…" },
  { n: 3, I: Ear, t: "ses duy", d: "Duyabildiğin üç sese odaklan. Uzaktaki ve yakındaki sesleri ayırt etmeye çalış." },
  { n: 2, I: Wind, t: "koku fark et", d: "Fark edebildiğin iki kokuyu düşün. Hiçbiri yoksa sevdiğin bir kokuyu hatırla." },
  { n: 1, I: Coffee, t: "tat hisset", d: "Ağzındaki bir tadı fark et ya da yavaşça bir yudum su iç." },
];

export function Grounding() {
  const [i, setI] = useState(-1);
  const done = i >= senses.length;
  const s = senses[Math.max(0, Math.min(i, senses.length - 1))];
  return (
    <section className="px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker>Şimdi ve burada</Kicker>
          <Fade>
            <h2 className="font-serif text-[clamp(2.6rem,5vw,4.6rem)] font-light leading-[1]">
              Duyularınla
              <br />
              <em className="text-rose">ana dön.</em>
            </h2>
          </Fade>
          <p className="mt-6 max-w-md text-muted">Zihnin hızlandığında dikkatini şu ana getirmeye yardımcı olabilecek, adım adım ilerleyen kısa bir farkındalık egzersizi.</p>
          <div className="mt-10 flex gap-2">
            {senses.map((x, k) => (
              <span key={x.n} className={`h-1.5 flex-1 rounded-full transition-colors duration-700 ${k <= i ? "bg-rose" : "bg-earth/10"}`} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="relative min-h-[380px] overflow-hidden rounded-[2.5rem] bg-ivory-2 p-8 sm:p-12">
            <AnimatePresence mode="wait">
              {i < 0 ? (
                <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex min-h-[300px] flex-col items-start justify-center">
                  <p className="font-serif text-4xl font-light leading-tight">Rahat bir pozisyon al, omuzlarını gevşet.</p>
                  <button onClick={() => setI(0)} className="mt-10 inline-flex items-center gap-2 rounded-full bg-earth px-7 py-4 text-sm text-ivory transition hover:bg-earth-2">
                    Başla <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </motion.div>
              ) : done ? (
                <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex min-h-[300px] flex-col items-start justify-center">
                  <Sparkles className="h-8 w-8 text-rose" strokeWidth={1.3} />
                  <p className="mt-6 font-serif text-4xl font-light leading-tight">Kendine birkaç dakika ayırdın. Bu da bir adım.</p>
                  <button onClick={() => setI(-1)} className="mt-10 inline-flex items-center gap-2 rounded-full border border-earth/25 px-6 py-3 text-sm transition hover:border-earth">
                    <RotateCcw className="h-4 w-4" strokeWidth={1.5} /> Yeniden
                  </button>
                </motion.div>
              ) : (
                <motion.div key={s.n} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.8, ease }} className="flex min-h-[300px] flex-col justify-between">
                  <div className="flex items-center gap-6">
                    <span className="font-serif text-[7rem] font-light leading-none text-rose">{s.n}</span>
                    <div>
                      <s.I className="h-7 w-7 text-sage" strokeWidth={1.3} />
                      <p className="mt-2 font-serif text-3xl italic">{s.t}</p>
                    </div>
                  </div>
                  <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted">{s.d}</p>
                  <div className="mt-10 flex items-center justify-between">
                    <button onClick={() => setI(i - 1)} className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-earth" aria-label="Önceki adım">
                      <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> Geri
                    </button>
                    <button onClick={() => setI(i + 1)} className="inline-flex items-center gap-2 rounded-full bg-earth px-6 py-3 text-sm text-ivory transition hover:bg-earth-2">
                      {i === senses.length - 1 ? "Tamamla" : "Sonraki"} <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="mt-4 text-xs text-muted">Bu egzersiz terapi veya tedavi yerine geçmez.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Terapi hakkında yanlış bilinenler ---------------- */
const myths = [
  { m: "Terapiye yalnızca çok ağır sorunları olanlar gider.", f: "Terapi; kendini tanımak, ilişkilerini anlamak veya bir yaşam geçişinde destek almak isteyen herkes için bir alan olabilir." },
  { m: "Psikolog bana ne yapmam gerektiğini söyler.", f: "Terapist hazır cevaplar vermek yerine, kendi yolunu ve çözümlerini fark etmene eşlik eder." },
  { m: "Bir iki görüşmede her şey düzelir.", f: "Süreç kişiye ve konuya göre değişir. Değişim çoğu zaman zaman, emek ve düzenlilik ister." },
  { m: "Terapiye gitmek zayıflık göstergesidir.", f: "Yardım istemek, kendine değer vermenin ve sorumluluk almanın bir göstergesidir." },
];

export function TherapyMyths() {
  const [o, setO] = useState<number | null>(null);
  return (
    <section className="bg-ivory-2 px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <Kicker>Yanlış bilinenler</Kicker>
        <Fade>
          <h2 className="font-serif text-[clamp(2.6rem,5vw,4.6rem)] font-light leading-[1]">
            Terapi hakkında
            <br />
            <em className="text-rose">doğru bildiklerimiz.</em>
          </h2>
        </Fade>
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {myths.map((x, i) => {
            const on = o === i;
            return (
              <Fade key={x.m} delay={i * 0.08}>
                <button onClick={() => setO(on ? null : i)} aria-expanded={on} className={`w-full rounded-[2rem] p-8 text-left transition-colors duration-700 sm:p-10 ${on ? "bg-earth text-ivory" : "bg-ivory hover:bg-white"}`}>
                  <span className={`text-[11px] uppercase tracking-[0.24em] ${on ? "text-rose" : "text-muted"}`}>{on ? "Aslında" : "Sık duyulan"}</span>
                  <p className="mt-4 font-serif text-[1.9rem] font-light leading-tight">“{x.m}”</p>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.8, ease }} className="overflow-hidden">
                        <span className="block pt-5 leading-relaxed text-ivory/75">{x.f}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </Fade>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gizlilik ve etik ilkeler ---------------- */
const principles = [
  { I: Lock, t: "Gizlilik", d: "Görüşmelerde paylaşılanlar, yasal yükümlülükler dışında üçüncü kişilerle paylaşılmaz." },
  { I: Scale, t: "Etik ilkeler", d: "Süreç, meslek etiği kuralları ve danışan hakları gözetilerek yürütülür." },
  { I: HeartHandshake, t: "Yargısız tutum", d: "Duyguların, düşüncelerin ve deneyimlerin saygıyla karşılanır." },
  { I: UserCheck, t: "Şeffaflık", d: "Süre, ücret ve çalışma koşulları en başta açık şekilde konuşulur." },
];

export function Principles() {
  return (
    <section className="px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker>Güven</Kicker>
            <Fade>
              <h2 className="font-serif text-[clamp(2.6rem,5vw,4.6rem)] font-light leading-[1]">
                Bu alan
                <br />
                <em className="text-rose">sana ait.</em>
              </h2>
            </Fade>
          </div>
          <p className="self-end text-lg leading-relaxed text-muted lg:col-span-6 lg:col-start-7">Terapötik ilişkinin temeli güvendir. Görüşmeler aşağıdaki ilkeler çerçevesinde, senin hızına ve sınırlarına saygı gösterilerek yürütülür.</p>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-earth/10 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Fade key={p.t} delay={i * 0.1} className="group bg-ivory p-9 transition-colors duration-700 hover:bg-white">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-sage-soft transition duration-700 group-hover:bg-rose-soft">
                <p.I className="h-6 w-6 text-earth" strokeWidth={1.3} />
              </span>
              <h3 className="mt-8 font-serif text-3xl">{p.t}</h3>
              <p className="mt-3 text-muted">{p.d}</p>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
