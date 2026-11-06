import { validateCatalog, type MuseApp } from "../../src/lib/catalog";

/** Synthetic data used only by isolated component and navigation tests. */
export function fixtureApp(rich = true): MuseApp {
  const app: MuseApp = {
    id: "render-fixture",
    name: "MuseTest",
    tagline: {
      tr: "Yalnızca arayüz testi için örnek veri; yayımlanmış bir Muse uygulaması değildir.",
      en: "Synthetic test data, never a public Muse application.",
    },
    description: {
      tr: "Bu yalıtılmış sayfa, ortak uygulama bileşenlerini test eder.",
      en: "This isolated page verifies the reusable application components.",
    },
    status: "prototype",
    published: false,
    buildVerifiedPlatforms: ["Windows"],
    ...(rich
      ? {
          platforms: ["Linux"] as MuseApp["platforms"],
          testedPlatforms: [
            {
              platform: "Linux" as const,
              environment: {
                tr: "Arayüz testi için örnek çalıştırma kaydı",
                en: "Synthetic runtime record for rendering tests",
              },
              notes: {
                tr: "Gerçek bir platform desteği iddiası değildir.",
                en: "This is not a real platform support claim.",
              },
            },
          ],
          features: [
            {
              tr: "Arayüz testi için örnek özellik",
              en: "Synthetic feature for the rendering test",
            },
          ],
          requirements: [
            { tr: "Örnek gereksinim", en: "Synthetic requirement" },
          ],
          installation: [
            { tr: "Örnek kurulum adımı", en: "Synthetic installation step" },
          ],
          limitations: [{ tr: "Örnek sınırlama", en: "Synthetic limitation" }],
          version: "test-1",
          releaseDate: "2026-11-07",
          repositoryUrl: "https://github.com/ysf-kul/muse",
          documentationUrl: "https://github.com/ysf-kul/muse#readme",
          issuesUrl: "https://github.com/ysf-kul/muse/issues",
          screenshots: [
            {
              src: "/assets/social-preview.png",
              alt: {
                tr: "Sitenin paylaşım görseliyle oluşturulmuş test görseli; uygulama ekran görüntüsü değildir",
                en: "Test image using the site’s social preview, not an application screenshot",
              },
              caption: {
                tr: "Yalnızca bileşen testi için kullanılır.",
                en: "Used only for component testing.",
              },
              width: 1200,
              height: 630,
            },
          ],
          downloads: [
            {
              label: {
                tr: "Deneme bağlantısı (indirme yok)",
                en: "Synthetic link test (no download)",
              },
              platform: "Linux" as const,
              url: "https://github.com/ysf-kul/muse",
            },
          ],
        }
      : { features: [], requirements: [], installation: [], limitations: [] }),
  };
  validateCatalog([app]);
  return app;
}
