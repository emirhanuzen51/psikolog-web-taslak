// Kişi ve iletişim bilgileri yayından önce doğrulanmış bilgilerle güncellenmelidir.
// Çalışma alanları ve yaklaşımlar, psikoloğun gerçek eğitim ve yetkinliklerine göre güncellenmelidir.
export const pro = {
  name: "Psk. Klinik Psikolog",
  title: "Psikolog", // unvan (ör. Uzman Klinik Psikolog) yalnızca belgelere göre yazılmalıdır
  address: "Örnek Mah. Örnek Sok. No:1, Şehir",
  phoneDisplay: "+90 (000) 000 00 00",
  phoneHref: "tel:+900000000000",
  email: "iletisim@psikolog-taslak.com",
  hours: "Hafta içi 10:00 – 19:00 (randevu ile)",
};

export const areas = [
  { t: "Bireysel terapi", d: "Kaygı, stres, yas, ilişki güçlükleri ve yaşam geçişleri gibi konularda bireysel görüşmeler.", c: "#a9b9b2" },
  { t: "Çift ve aile", d: "İletişim, uyum ve ilişki dinamikleri üzerine çiftlerle ve ailelerle yürütülen görüşmeler.", c: "#c99f9c" },
  { t: "Ergen", d: "Ergenlik döneminin duygusal ve sosyal süreçlerine yönelik, aileyle de iş birliği içinde görüşmeler.", c: "#b8b6a5" },
  { t: "Çevrim içi görüşme", d: "Uygun koşullarda, güvenli bir bağlantı üzerinden görüntülü görüşme imkânı.", c: "#d8c3b0" },
];

export const approaches = [
  { t: "Bilişsel Davranışçı Terapi", d: "Düşünce, duygu ve davranış arasındaki ilişkiyi anlamaya odaklanan, yapılandırılmış bir yaklaşım." },
  { t: "Şema Terapi", d: "Erken dönem deneyimlerden gelen kalıpları fark etmeyi ve dönüştürmeyi amaçlar." },
  { t: "Kabul ve Kararlılık Terapisi", d: "Zorlayıcı düşünce ve duygularla esnek bir ilişki kurmayı ve değerlerle uyumlu yaşamayı hedefler." },
];

export const journey = [
  { t: "İlk iletişim", d: "Telefon veya e-postayla kısa bir ön bilgi; görüşme koşulları paylaşılır." },
  { t: "Ön görüşme", d: "Beklentilerin ve ihtiyaçların konuşulduğu, tanışma niteliğinde bir görüşme." },
  { t: "Değerlendirme", d: "Sürecin hedefleri ve uygun yaklaşım birlikte belirlenir." },
  { t: "Düzenli görüşmeler", d: "Belirlenen sıklıkta, güvenli ve gizli bir alanda süreç ilerler." },
];

export const faqs = [
  { q: "Görüşmelerde konuşulanlar gizli kalır mı?", a: "Evet. Görüşmeler meslek etiği ve gizlilik ilkeleri çerçevesinde yürütülür; yasal zorunluluklar dışında üçüncü kişilerle paylaşılmaz. Gizliliğin sınırları ilk görüşmede açıkça konuşulur." },
  { q: "Bir görüşme ne kadar sürer?", a: "Görüşmeler genellikle 50 dakika civarındadır. Süre ve sıklık, sürecin ihtiyacına göre birlikte belirlenir." },
  { q: "Çevrim içi görüşme yüz yüze görüşme kadar etkili mi?", a: "Uygun durumlarda çevrim içi görüşme iyi bir seçenek olabilir. Uygunluk, ön görüşmede birlikte değerlendirilir." },
  { q: "Ücret ve iptal koşulları nelerdir?", a: "Ücret ve iptal koşulları ilk iletişimde açıkça paylaşılır." },
  { q: "Psikolog ile psikiyatrist arasındaki fark nedir?", a: "Psikiyatrist tıp doktorudur ve ilaç tedavisi düzenleyebilir; psikolog ise psikolojik değerlendirme ve psikoterapi alanında çalışır. Gerektiğinde iki meslek iş birliği içinde çalışır." },
];

export const moods = [
  { id: "sakin", label: "Sakin", c: "#a9b9b2" },
  { id: "umutlu", label: "Umutlu", c: "#d8c3b0" },
  { id: "yorgun", label: "Yorgun", c: "#b8b6a5" },
  { id: "kaygili", label: "Kaygılı", c: "#c99f9c" },
  { id: "huzunlu", label: "Hüzünlü", c: "#8e9aa8" },
] as const;
