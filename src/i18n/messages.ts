export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export type LocalizedText = Record<Locale, string>;
export type TranslationParams = Record<string, string | LocalizedText>;
export const languageNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
};
export const defaultLocale: Locale = "tr";

const en = {
  "brand.slogan": "Simple software that makes everyday life better.",
  "brand.philosophy": "Different Apps. One Muse.",
  "brand.description":
    "Muse is an independent personal collection of simple, useful software projects, built with the assistance of AI tools.",
  "nav.home": "Home",
  "nav.software": "Software",
  "nav.about": "About",
  "a11y.skip": "Skip to content",
  "a11y.home": "Muse home",
  "a11y.navigation": "Main navigation",
  "a11y.values": "Muse values",
  "a11y.principles": "What guides Muse",
  "a11y.published": "Published applications",
  "a11y.downloads": "Downloads and project information",
  "a11y.screenshot": "View full screenshot: {alt}",
  "language.action": "Language: {current}. Switch to {next}",
  "language.announcement": "Language changed to English.",
  "theme.system": "System",
  "theme.light": "Light",
  "theme.dark": "Dark",
  "theme.action": "Theme: {current}. Switch to {next} theme",
  "home.eyebrow": "Independent by nature",
  "home.titleFirst": "Simple software.",
  "home.titleSecond": "A better everyday.",
  "home.description":
    "A personal collection of useful tools, built with care and a little help from AI. Small ideas for the things you do every day.",
  "home.explore": "Explore the software",
  "home.about": "A little about Muse",
  "home.approach": "The Muse approach",
  "home.noteFirst": "Less friction.",
  "home.noteSecond": "More room for",
  "home.noteThird": "the everyday.",
  "home.notePurpose": "Useful by purpose.",
  "home.noteDesign": "Thoughtful by design.",
  "home.independent": "Personal & independent",
  "home.sharedDesign": "One shared design language",
  "home.aiAssistance": "Built with AI assistance",
  "home.collection": "The collection",
  "home.collectionTitle": "Little tools. Real purpose.",
  "home.commonThread": "A common thread",
  "home.differentApps": "Different Apps.",
  "home.oneMuse": "One Muse.",
  "home.philosophy":
    "Different tools can feel at home together. Muse projects share a thoughtful design language, clear interactions, and a focus on making everyday tasks a little easier.",
  "home.philosophyLink": "The idea behind Muse",
  "common.allSoftware": "All software",
  "common.aboutMuse": "About Muse",
  "common.source": "Source",
  "common.contact": "Contact",
  "common.exploreApp": "Explore {name}",
  "catalog.eyebrow": "The Muse collection",
  "catalog.title": "Software with a purpose.",
  "catalog.description":
    "A growing home for simple tools, each made to do something useful.",
  "catalog.emptyTitle": "A little patience. A lot of possibility.",
  "catalog.emptyDescription":
    "No applications have been published here yet. When a project is ready, you’ll find its details, screenshots, and verified download links right here.",
  "catalog.emptyLabel": "The collection is just beginning",
  "catalog.about": "Get to know Muse",
  "catalog.noteTitle": "A clear picture of every project.",
  "catalog.note":
    "Each application page will list its actual features, requirements, and available builds. Windows and Linux are the current desktop targets; support is listed only after the project’s workflows have been tested.",
  "about.eyebrow": "A little introduction",
  "about.titleFirst": "Small ideas.",
  "about.titleSecond": "Thoughtfully made.",
  "about.intro":
    "Muse is a personal collection of software projects, each starting with a simple idea: make an everyday task a little better.",
  "about.heading": "Independent by nature.",
  "about.personal":
    "Muse is an independent personal project, not a company. It’s a place for useful tools with focused purposes and considered interfaces.",
  "about.tools":
    "AI tools help with designing and building the projects. Those tools may change over time; Muse is not tied to any one model or provider. The projects and their source repositories remain the source of truth.",
  "about.aim":
    "The aim is simple: software that does something useful, feels pleasant to use, and respects the person using it.",
  "about.explore": "Explore the collection",
  "about.guides": "What guides the work",
  "about.purposeTitle": "Purpose before more.",
  "about.purpose":
    "A clear job to do. No features just for the sake of a longer list.",
  "about.design":
    "Individual tools, connected by a shared, accessible design language.",
  "about.toolsTitle": "Tools can change.",
  "about.knowledge":
    "AI-assisted development, with project knowledge kept in the repository.",
  "footer.tagline": "Small tools. Thoughtfully made.",
  "footer.description": "An independent personal software collection.",
  "error.eyebrow": "404 · Page not found",
  "error.title": "A little off the path.",
  "error.description":
    "This page may have moved, or the address may be incomplete. You can find your way back to Muse below.",
  "error.home": "Back to home",
  "error.software": "Browse software",
  "status.prototype": "Prototype",
  "status.in-development": "In development",
  "status.released": "Released",
  "status.archived": "Archived",
  "app.screenshots": "A closer look",
  "app.mediaUnavailable": "Screenshots aren’t available for this project yet.",
  "app.features": "What it does",
  "app.platforms": "Platforms & verification",
  "app.platformDescription":
    "Windows and Linux are Muse’s current desktop targets. A build alone does not establish runtime compatibility.",
  "app.supported": "Supported · Runtime tested",
  "app.tested": "Runtime tested · Support not declared",
  "app.built": "Build verified · Runtime not tested",
  "app.unverified": "Support not verified",
  "app.macos": "macOS is not currently supported or tested.",
  "app.requirements": "Requirements",
  "app.installation": "Installation",
  "app.limitations": "Known limitations",
  "app.release": "Release information",
  "app.version": "Version {version}",
  "app.released": "Released",
  "app.downloads": "Downloads",
  "app.downloadsUnavailable":
    "There are no verified downloads available for this project yet.",
  "app.links": "Project links",
  "app.repository": "Source repository",
  "app.releaseNotes": "Release notes & checksums",
  "app.documentation": "Documentation",
  "app.issues": "Report an issue",
  "seo.homeTitle": "Muse — Simple software for everyday life",
  "seo.softwareTitle": "Software · Muse",
  "seo.aboutTitle": "About Muse · Muse",
  "seo.aboutDescription":
    "A personal software collection, made with care and AI assistance. Meet the idea behind Muse.",
  "seo.errorTitle": "Page not found · Muse",
  "seo.errorDescription":
    "This page could not be found. Find your way back to the Muse collection.",
  "seo.imageAlt": "Muse. Simple software that makes everyday life better.",
};

export type TranslationKey = keyof typeof en;

const tr: Record<TranslationKey, string> = {
  "brand.slogan": "Günlük hayatı güzelleştiren basit yazılımlar.",
  "brand.philosophy": "Farklı uygulamalar. Tek bir Muse.",
  "brand.description":
    "Muse, yapay zekâ desteğiyle geliştirilen, basit ve kullanışlı yazılımlardan oluşan bağımsız, kişisel bir koleksiyon.",
  "nav.home": "Ana sayfa",
  "nav.software": "Yazılımlar",
  "nav.about": "Hakkında",
  "a11y.skip": "İçeriğe geç",
  "a11y.home": "Muse ana sayfası",
  "a11y.navigation": "Ana gezinme",
  "a11y.values": "Muse'un değerleri",
  "a11y.principles": "Muse'a yön veren ilkeler",
  "a11y.published": "Yayımlanmış uygulamalar",
  "a11y.downloads": "İndirmeler ve proje bilgileri",
  "a11y.screenshot": "Ekran görüntüsünü tam boyutta aç: {alt}",
  "language.action": "Dil: {current}. {next} diline geç",
  "language.announcement": "Dil Türkçe olarak değiştirildi.",
  "theme.system": "Sistem",
  "theme.light": "Açık",
  "theme.dark": "Koyu",
  "theme.action": "Tema: {current}. {next} temaya geç",
  "home.eyebrow": "Doğası gereği bağımsız",
  "home.titleFirst": "Basit yazılımlar.",
  "home.titleSecond": "Daha güzel bir hayat.",
  "home.description":
    "Günlük işlere küçük kolaylıklar getiren, özenle ve yapay zekâ desteğiyle geliştirilen kişisel bir yazılım koleksiyonu.",
  "home.explore": "Yazılımları keşfet",
  "home.about": "Muse'u tanı",
  "home.approach": "Muse'un yaklaşımı",
  "home.noteFirst": "Daha az zahmet.",
  "home.noteSecond": "Günlük hayata",
  "home.noteThird": "daha çok alan.",
  "home.notePurpose": "Bir ihtiyaca yönelik.",
  "home.noteDesign": "Özenle tasarlandı.",
  "home.independent": "Kişisel ve bağımsız",
  "home.sharedDesign": "Ortak bir tasarım dili",
  "home.aiAssistance": "Yapay zekâ desteğiyle",
  "home.collection": "Koleksiyon",
  "home.collectionTitle": "Küçük araçlar. Gerçek bir amaç.",
  "home.commonThread": "Ortak bir çizgi",
  "home.differentApps": "Farklı uygulamalar.",
  "home.oneMuse": "Tek bir Muse.",
  "home.philosophy":
    "Her araç farklı bir işe yarasa da aynı özeni hissettirebilir. Muse projeleri ortak bir tasarım dilini, anlaşılır etkileşimleri ve günlük işleri biraz daha kolaylaştırma amacını paylaşır.",
  "home.philosophyLink": "Muse'un ardındaki fikir",
  "common.allSoftware": "Tüm yazılımlar",
  "common.aboutMuse": "Muse hakkında",
  "common.source": "Kaynak kod",
  "common.contact": "İletişim",
  "common.exploreApp": "{name} uygulamasını keşfet",
  "catalog.eyebrow": "Muse koleksiyonu",
  "catalog.title": "Bir işe yarayan yazılımlar.",
  "catalog.description":
    "Her biri bir ihtiyaca yönelik basit araçlar için büyüyen bir koleksiyon.",
  "catalog.emptyTitle": "Biraz sabır. Pek çok olasılık.",
  "catalog.emptyDescription":
    "Burada henüz yayımlanmış bir uygulama yok. Bir proje hazır olduğunda açıklamasını, ekran görüntülerini ve doğrulanmış indirme bağlantılarını burada bulabileceksin.",
  "catalog.emptyLabel": "Koleksiyon henüz yolun başında",
  "catalog.about": "Muse'u tanı",
  "catalog.noteTitle": "Her proje hakkında açık bilgi.",
  "catalog.note":
    "Her uygulamanın sayfasında mevcut özellikleri, gereksinimleri ve yayımlanmış paketleri yer alacak. Masaüstünde Windows ve Linux hedefleniyor; bir platform yalnızca projenin temel işlevleri o ortamda test edildikten sonra desteklenen platform olarak listelenecek.",
  "about.eyebrow": "Kısa bir tanışma",
  "about.titleFirst": "Küçük fikirler.",
  "about.titleSecond": "Özenli bir yaklaşım.",
  "about.intro":
    "Muse, her biri günlük bir işi biraz daha kolaylaştırma fikriyle başlayan kişisel yazılım projelerinden oluşan bir koleksiyon.",
  "about.heading": "Doğası gereği bağımsız.",
  "about.personal":
    "Muse bağımsız, kişisel bir projedir; bir şirket değildir. İşlevi net, arayüzü özenle düşünülmüş araçlara yer verir.",
  "about.tools":
    "Projelerin tasarlanması ve geliştirilmesinde yapay zekâ araçlarından yararlanılır. Kullanılan araçlar zamanla değişebilir; Muse tek bir modele ya da sağlayıcıya bağlı değildir. Esas alınacak bilgiler, projelerde ve kaynak kod depolarında bulunur.",
  "about.aim":
    "Amaç, işe yarayan, kullanımı keyifli ve kullanıcıya saygılı yazılımlar geliştirmek.",
  "about.explore": "Koleksiyonu keşfet",
  "about.guides": "Çalışmaya yön veren ilkeler",
  "about.purposeTitle": "Önce ihtiyaç.",
  "about.purpose":
    "Her aracın yapacağı iş belli olmalı. Sırf özellik listesi uzasın diye yeni özellikler eklenmemeli.",
  "about.design":
    "Birbirinden farklı araçlar, ortak ve erişilebilir bir tasarım diliyle bir araya gelir.",
  "about.toolsTitle": "Araçlar değişebilir.",
  "about.knowledge":
    "Yapay zekâ geliştirmeye yardımcı olur; projeye dair temel bilgiler kaynak kod deposunda saklanır.",
  "footer.tagline": "Küçük araçlar. Özenle geliştirildi.",
  "footer.description": "Bağımsız, kişisel bir yazılım koleksiyonu.",
  "error.eyebrow": "404 · Sayfa bulunamadı",
  "error.title": "Aradığın sayfa burada yok.",
  "error.description":
    "Sayfa taşınmış ya da adres eksik yazılmış olabilir. Aşağıdaki bağlantılardan Muse'a dönebilirsin.",
  "error.home": "Ana sayfaya dön",
  "error.software": "Yazılımlara göz at",
  "status.prototype": "Prototip",
  "status.in-development": "Geliştiriliyor",
  "status.released": "Yayımlandı",
  "status.archived": "Arşivlendi",
  "app.screenshots": "Yakından bak",
  "app.mediaUnavailable": "Bu proje için henüz ekran görüntüsü bulunmuyor.",
  "app.features": "Neler yapar?",
  "app.platforms": "Platformlar ve test durumu",
  "app.platformDescription":
    "Muse'un masaüstü hedefleri Windows ve Linux. Bir paketin derlenebilmesi, uygulamanın o ortamda çalıştığını göstermez.",
  "app.supported": "Destekleniyor · Çalışması test edildi",
  "app.tested": "Çalışması test edildi · Destek henüz ilan edilmedi",
  "app.built": "Derleme doğrulandı · Çalışması test edilmedi",
  "app.unverified": "Platform desteği doğrulanmadı",
  "app.macos": "macOS şu anda desteklenmiyor ve test edilmedi.",
  "app.requirements": "Gereksinimler",
  "app.installation": "Kurulum",
  "app.limitations": "Bilinen sınırlamalar",
  "app.release": "Sürüm bilgileri",
  "app.version": "Sürüm {version}",
  "app.released": "Yayımlanma tarihi:",
  "app.downloads": "İndirmeler",
  "app.downloadsUnavailable":
    "Bu proje için henüz doğrulanmış bir indirme bağlantısı bulunmuyor.",
  "app.links": "Proje bağlantıları",
  "app.repository": "Kaynak kod deposu",
  "app.releaseNotes": "Sürüm notları ve sağlama toplamları",
  "app.documentation": "Belgeler",
  "app.issues": "Sorun bildir",
  "seo.homeTitle": "Muse — Günlük hayatı güzelleştiren basit yazılımlar",
  "seo.softwareTitle": "Yazılımlar · Muse",
  "seo.aboutTitle": "Muse hakkında · Muse",
  "seo.aboutDescription":
    "Özenle ve yapay zekâ desteğiyle geliştirilen kişisel bir yazılım koleksiyonu. Muse'un ardındaki fikri tanı.",
  "seo.errorTitle": "Sayfa bulunamadı · Muse",
  "seo.errorDescription":
    "Bu sayfa bulunamadı. Muse koleksiyonuna geri dönmek için bağlantıları kullanabilirsin.",
  "seo.imageAlt": "Muse. Günlük hayatı güzelleştiren basit yazılımlar.",
};

export const messages: Record<Locale, Record<TranslationKey, string>> = {
  tr,
  en,
};

export function translate(
  locale: Locale,
  key: TranslationKey,
  params: TranslationParams = {},
): string {
  return messages[locale][key].replace(/\{(\w+)\}/g, (_, name: string) => {
    const value = params[name];
    if (value === undefined)
      throw new Error(`Missing translation parameter: ${key}.${name}`);
    return typeof value === "string" ? value : value[locale];
  });
}

export function isLocalizedText(value: unknown): value is LocalizedText {
  return (
    typeof value === "object" &&
    value !== null &&
    locales.every(
      (locale) =>
        typeof (value as LocalizedText)[locale] === "string" &&
        (value as LocalizedText)[locale].trim().length > 0,
    )
  );
}
