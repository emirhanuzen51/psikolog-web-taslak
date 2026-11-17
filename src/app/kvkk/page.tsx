import type { Metadata } from "next";
import Link from "next/link";
import { pro } from "@/lib/data";
import { Logo } from "@/components/site";

export const metadata: Metadata = { title: "KVKK Aydınlatma Metni | İç Alan Psikoloji" };

// NOT: Taslak metindir; yayından önce hukuk kontrolünden geçirilmelidir.
export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/"><Logo /></Link>
      <h1 className="mt-14 font-serif text-5xl font-light">KVKK Aydınlatma Metni</h1>
      <div className="mt-8 grid gap-5 leading-relaxed text-muted">
        <p>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla {pro.name} tarafından kişisel verileriniz aşağıdaki çerçevede işlenir.</p>
        <p><b className="font-medium text-earth">İşlenen veriler:</b> Telefon veya e-posta ile iletişime geçtiğinizde paylaştığınız ad-soyad ve iletişim bilgileri. Bu internet sitesi üzerinden psikolojik veya sağlık bilgisi toplanmaz.</p>
        <p><b className="font-medium text-earth">Duygu günlüğü:</b> Sitedeki günlük notları yalnızca kendi tarayıcınızda saklanır; sunucuya gönderilmez ve tarafımızca erişilemez. &quot;Tümünü sil&quot; ile dilediğiniz an silebilirsiniz.</p>
        <p><b className="font-medium text-earth">Haklarınız:</b> KVKK m.11 kapsamındaki taleplerinizi {pro.email} adresine iletebilirsiniz.</p>
      </div>
    </main>
  );
}
