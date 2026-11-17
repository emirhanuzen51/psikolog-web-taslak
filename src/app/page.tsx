import { About, Approach, Breath, Contact, Faq, Footer, Header, Journal, Journey } from "@/components/site";
import { Grounding, Principles, TherapyMyths } from "@/components/extra";
import { AreasDeep, Gallery, Grain, HeroDeep, QuoteBand } from "@/components/deep";

export default function Home() {
  return (
    <>
      <Grain />
      <Header />
      <main>
        <HeroDeep />
        <Approach />
        <Gallery />
        <AreasDeep />
        <Breath />
        <Grounding />
        <Journey />
        <QuoteBand />
        <TherapyMyths />
        <Journal />
        <Principles />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
