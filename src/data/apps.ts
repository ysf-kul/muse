import type { MuseApp } from "../lib/catalog";

/** Publish only after release assets and platform evidence are verified. */
export const apps: MuseApp[] = [
  {
    id: "video-bridge",
    name: "Muse Video Bridge",
    tagline: {
      tr: "Videolarını USB üzerinden CYD ekranına taşı.",
      en: "Bring your videos to a CYD display over USB.",
    },
    description: {
      tr: "Muse Video Bridge, yerel MP4 videolarını ESP32-2432S028R için dönüştüren bir masaüstü uygulaması ve ESP32 yazılımıdır. microSD kartı cihazda tutarak USB üzerinden video gönder, 320×240 ekranda oynat ve oynatma durumunu masaüstünden izle.",
      en: "Muse Video Bridge pairs a desktop application with ESP32 firmware to convert local MP4 videos for the ESP32-2432S028R. Keep the microSD card in the device, send videos over USB, play them on its 320×240 display, and monitor playback from your desktop.",
    },
    status: "released",
    published: true,
    featured: true,
    icon: "/assets/video-bridge-icon.png",
    screenshots: [
      {
        src: "/assets/video-bridge-desktop.webp",
        alt: {
          tr: "Muse Video Bridge 0.4.1 Linux masaüstü uygulamasının İngilizce, açık temalı başlangıç ekranı; USB bağlantısı henüz kurulmamış",
          en: "Muse Video Bridge 0.4.1's Linux desktop start screen in English and light theme, with the USB device disconnected",
        },
        caption: {
          tr: "Muse Video Bridge 0.4.1 · Linux · İngilizce · Açık tema · Cihaz bağlı değil",
          en: "Muse Video Bridge 0.4.1 · Linux · English · Light theme · Device disconnected",
        },
        width: 1160,
        height: 860,
      },
    ],
    features: [
      {
        tr: "Birden fazla MP4 seç ve sırayla hazırla; seçilen videoları USB ile birlikte gönder veya bağlı FAT32 SD karta yaz. Hazırlanan video kayıtları ve SD kuyruğu yeniden başlatmada korunur; aktarım hata kodları görünürdür.",
        en: "Select and prepare multiple MP4s, then send selected videos together over USB or write them to a mounted FAT32 SD card. Prepared registrations and SD queues survive restart; transfer error codes are visible.",
      },
      {
        tr: "En fazla 12 videoluk kuyruk: seç, sırala, çıkar, önceki/sonraki videoya geç. Bir kez oynat, geçerli videoyu döngüye al veya tüm kuyruğu döngüye al; masaüstü cihazın gerçek durumunu izler.",
        en: "A queue for up to 12 videos: select, reorder, remove, and navigate previous/next. Play Once, Loop Current, and Loop Queue share the device's confirmed playback state.",
      },
      {
        tr: "Gerçek aktarım ve doğrulama ilerlemesi; ölçülemeyen hazırlık adımları yüzde uydurmadan gösterilir. CYD dokunmatik kontrolleri dört saniye sonra gizlenir; fiziksel dokunma doğrulaması henüz yapılmadı.",
        en: "Real transfer and verification progress, with indeterminate preparation steps shown honestly. CYD touch controls hide after four seconds; physical touch acceptance remains unverified.",
      },
      {
        tr: "Yerel MP4 videolarını kalite ve kare hızı seçenekleriyle indeksli JPEG videoya dönüştürür; hesap veya bulut servisi gerekmez.",
        en: "Convert local MP4 files to indexed JPEG video with quality and frame-rate controls; no account or cloud service is required.",
      },
      {
        tr: "Takılı microSD karta USB seri bağlantısıyla gönderim; onaylanan veriyle ilerleme takibi, boyut ve SHA-256 doğrulaması, iptal ve kesilen aktarıma devam etme.",
        en: "Transfer over USB serial to the installed microSD card, with acknowledged progress, size and SHA-256 verification, cancellation, and interrupted-transfer recovery.",
      },
      {
        tr: "ESP32-2432S028R / CYD üzerinde 320×240 tam ekran oynatma. 0.4.1, temas olmayan 28 klipte 336 aktif saniye boyunca 29,95 FPS ölçtü; önceki doğrulanmış sonuç 29,80 FPS idi. 15 yeni tam ekran bellek kontrolünde piksel uyuşmazlığı ve DMA sahiplik hatası yoktu. Dokunma kontrolleri deneyseldir.",
        en: "Full-screen 320×240 playback on ESP32-2432S028R / CYD. Version 0.4.1 measured 29.95 FPS over 336 active seconds across 28 contact-free clips, compared with the prior qualified 29.80 FPS. Fifteen new full-region memory checks found zero pixel mismatches or DMA ownership errors. Touch remains experimental.",
      },
      {
        tr: "Oynat, duraklat, devam ettir, durdur, yeniden başlat ve konum ara; boyut, konum, 90° dönüş ve hedef FPS ayarlarıyla gerçek FPS ve cihaz telemetrisini izle.",
        en: "Play, pause, resume, stop, restart, and seek; adjust size, position, quarter-turn rotation, and target FPS while viewing actual FPS and device telemetry.",
      },
      {
        tr: "Türkçe ve İngilizce arayüz, açık/koyu/sistem teması ve yerel olarak saklanan ayarlar.",
        en: "Turkish and English interfaces, light/dark/system themes, and locally saved settings.",
      },
    ],
    platforms: ["Linux"],
    testedPlatforms: [
      {
        platform: "Linux",
        environment: {
          tr: "CachyOS x86-64 · GTK3 / WebKitGTK 4.1",
          en: "CachyOS x86-64 · GTK3 / WebKitGTK 4.1",
        },
        notes: {
          tr: "0.4.1 taşınabilir arşivi ve AppImage doğrudan FUSE ve çıkarıp çalıştırma modunda açıldı, görüntülendi ve temiz kapandı. Kuyruk ve döngü modları gerçek Linux/USB cihazında test edildi; fiziksel dokunma ve ekran görünümü doğrulanmadı.",
          en: "Standalone 0.4.1 tar and AppImage rendered and closed cleanly through direct FUSE and extract-and-run modes. Queue and loop modes were tested on the real Linux/USB device; physical taps and display appearance remain unverified.",
        },
      },
      {
        platform: "Windows",
        environment: {
          tr: "GitHub Actions · Windows Server 2025 Datacenter · AMD64",
          en: "GitHub Actions · Windows Server 2025 Datacenter · AMD64",
        },
        notes: {
          tr: "Yayımlanan ZIP'in indirilmesi ve sağlama toplamları, yerel pencere oluşturma ve beş saniye çalışması, paketli FFprobe ve 320×240/10 kare dönüşüm/çözme CI üzerinde doğrulandı. Windows 10/11 etkileşimli kullanım ve fiziksel USB testi yapılmadı.",
          en: "CI verified the published ZIP download and checksums, native window creation and five-second survival, bundled FFprobe, and 320×240/10-frame conversion/decoding. Interactive Windows 10/11 use and physical USB remain untested.",
        },
      },
    ],
    buildVerifiedPlatforms: ["Linux", "Windows"],
    requirements: [
      {
        tr: "ILI9341 ekranlı, dirençli dokunmatik ESP32-2432S028R 2,8 inç CYD; kurulumdan önce kart revizyonunu ve belgelenen pin düzenini kontrol et.",
        en: "A resistive 2.8-inch ESP32-2432S028R CYD with an ILI9341 display; check the board revision and documented pinout before flashing.",
      },
      {
        tr: "Cihazda takılı FAT32 microSD kart, veri aktarabilen USB kablosu ve v0.4.1 ile gelen Muse Video Bridge ESP32 yazılımı. Uygulama kartı biçimlendirmez.",
        en: "An installed FAT32 microSD card, a USB data cable, and Muse Video Bridge firmware from v0.4.1. The application does not format the card.",
      },
      {
        tr: "Windows 10/11 x64 için WebView2 Runtime ve gerekirse CH340 sürücüsü; Linux x86-64 için glibc 2.34+, GTK3, WebKitGTK 4.1, libudev, FFmpeg/FFprobe 8+ ve seri port erişimi.",
        en: "Windows 10/11 x64 requires WebView2 Runtime and a CH340 driver if needed; Linux x86-64 requires glibc 2.34+, GTK3, WebKitGTK 4.1, libudev, FFmpeg/FFprobe 8+, and serial-port access.",
      },
    ],
    installation: [
      {
        tr: "İşletim sistemine uygun paketi indir, SHA-256 sağlama toplamını kontrol et ve kurulum belgesini takip et.",
        en: "Download the package for your operating system, verify its SHA-256 checksum, and follow the installation documentation.",
      },
      {
        tr: "Kart modelini doğrula ve ESP32 yazılımını yüklemeden önce mevcut flash belleğin tam yedeğini al. FAT32 microSD kartı CYD içinde bırak.",
        en: "Confirm the board model and make a complete flash backup before installing firmware. Keep the FAT32 microSD card inside the CYD.",
      },
      {
        tr: "Masaüstünde Videoları ekle ile birden fazla MP4 seç ve tümünü hazırla. Hazırlanan kayıtları seç, gerçek USB portuna bağlan ve Seçilenleri USB ile gönder seçeneğini kullan; doğrulama ve hazırlık tamamlanana kadar bekle.",
        en: "Use Add videos to select multiple MP4s and prepare them all. Select prepared entries, connect to the actual USB port, choose Send selected over USB, and wait for verification and readiness.",
      },
      {
        tr: "Videoyu oynat ve masaüstü kontrollerini kullan. Varsayılan dönüşüm 25 FPS'tir; isteğe bağlı 30 FPS ve kalite ayarlarının sonuçları videoya bağlıdır.",
        en: "Play the video and use the desktop controls. Conversion defaults to 25 FPS; optional 30 FPS and quality settings depend on the source video.",
      },
    ],
    limitations: [
      {
        tr: "0.4.1 bir ön sürümdür. Kullanıcı denemeler sırasında panele dokunduğunu doğruladı; temaslı klipler boşta dokunma doğrulamasına katılmadı. Fiziksel dokunmatik düğme işlevleri, kalibrasyon ve ekran görünümü henüz tam doğrulanmadı.",
        en: "0.4.1 is a pre-release. The owner confirmed tapping during diagnostics; contact-affected clips are excluded from idle qualification. Physical touch-button actions, calibration and display acceptance are incomplete.",
      },
      {
        tr: "Fiziksel dokunma, panel kalibrasyonu ve ekran görünümü doğrulanmadı. Kuyruk ve döngü modu SD kartta, hazırlanan video kayıtları yerel önbellekte saklanır. Yeniden bağlantıda cihazın gerçek durumu okunur; duraklama ve video konumu yeniden başlatmada saklanmaz.",
        en: "Physical taps, panel calibration and display appearance are unverified. Queue order/mode are saved on SD and prepared registrations in the local cache. Reconnect reads real device state; paused state and seek position are not persisted.",
      },
      {
        tr: "Windows doğrulaması Server 2025 üzerindeki sınırlı CI açılış/dönüşüm testiyle sınırlıdır; Windows 10/11 etkileşimli kullanım ve fiziksel USB/oynatma henüz test edilmedi. Linux çalıştırma testi CachyOS x86-64 ile sınırlıdır; DEB/RPM kurulumu Debian, Ubuntu, Fedora ve openSUSE üzerinde doğrulanmadı.",
        en: "Windows verification is limited to the Server 2025 CI launch/conversion smoke; interactive Windows 10/11 use and physical USB/playback remain untested. Linux runtime testing is limited to CachyOS x86-64; DEB/RPM installation on Debian, Ubuntu, Fedora, and openSUSE is unverified.",
      },
      {
        tr: "FPS değerleri test videosuna ve aktif ölçüm süresine bağlıdır; her video için garanti değildir. Seri zaman aşımı yaşayan ve dokunma içeren klipler ölçüme katılmadı; sonuç dokunmatik kontrolleri doğrulamaz.",
        en: "FPS figures depend on the test video and active measurement duration, and are not guarantees for every video. Failed serial commands and contact-affected clips were excluded; these results do not qualify touch controls.",
      },
      {
        tr: "ESP32 yazılımı kaynak kodu ve derleme talimatlarıyla sunulur; bu sürüm önceden derlenmiş bir cihaz yazılımı veya yükleme kiti içermez. Kurulum için belgelenen PlatformIO araçları gerekir.",
        en: "ESP32 firmware is supplied as source with build instructions; this release does not include a prebuilt firmware image or flashing kit. Setup requires the documented PlatformIO tools.",
      },
      {
        tr: "Yalnızca video oynatılır; ses, MP4'ün ESP32 üzerinde doğrudan çözülmesi ve keyfi açılı dönüş desteklenmez. İndeksli .mvb biçimi deneysel olmaya devam eder.",
        en: "Playback is video only; audio, direct MP4 decoding on the ESP32, and arbitrary-angle rotation are unavailable. The indexed .mvb format remains experimental.",
      },
      {
        tr: "Linux referans cihazında 1,54 MB yeni video yaklaşık 28,8 kB/s onaylı hızla aktarıldı. Hızlı USB aktarımı için 0.4.1 masaüstü ve eşleşen 921600 baud cihaz yazılımı gerekir; yalnızca masaüstünü güncellemek eski yazılımın hızını değiştirmez. Büyük kuyruklar bağlı FAT32 karta doğrudan yazılabilir. Windows fiziksel USB ve tüm güç kesilmesi senaryoları doğrulanmadı.",
        en: "A new 1.54 MB video measured about 28.8 kB/s acknowledged transfer on the Linux reference device. Faster USB requires the 0.4.1 desktop and matching 921600-baud firmware; updating only the desktop leaves old firmware at its original rate. Large queues can be written directly to a mounted FAT32 card. Physical Windows USB and all power-loss scenarios remain unverified.",
      },
    ],
    version: "0.4.1",
    releaseDate: "2026-11-15",
    releaseUrl:
      "https://github.com/ysf-kul/musevideobridge/releases/tag/v0.4.1",
    downloads: [
      {
        label: { tr: "AppImage · x86-64", en: "AppImage · x86-64" },
        platform: "Linux",
        url: "https://github.com/ysf-kul/musevideobridge/releases/download/v0.4.1/Muse-Video-Bridge-0.4.1-Linux-x86_64.AppImage",
        size: "4.2 MiB",
      },
      {
        label: {
          tr: "Taşınabilir arşiv · x86-64",
          en: "Portable archive · x86-64",
        },
        platform: "Linux",
        url: "https://github.com/ysf-kul/musevideobridge/releases/download/v0.4.1/Muse-Video-Bridge-0.4.1-Linux-x86_64.tar.gz",
        size: "3.9 MiB",
      },
      {
        label: { tr: "DEB paketi · amd64", en: "DEB package · amd64" },
        platform: "Linux",
        url: "https://github.com/ysf-kul/musevideobridge/releases/download/v0.4.1/Muse-Video-Bridge-0.4.1-Linux-amd64.deb",
        size: "3.9 MiB",
      },
      {
        label: { tr: "RPM paketi · x86-64", en: "RPM package · x86-64" },
        platform: "Linux",
        url: "https://github.com/ysf-kul/musevideobridge/releases/download/v0.4.1/Muse-Video-Bridge-0.4.1-Linux-x86_64.rpm",
        size: "3.9 MiB",
      },
      {
        label: { tr: "Taşınabilir ZIP · x64", en: "Portable ZIP · x64" },
        platform: "Windows",
        url: "https://github.com/ysf-kul/musevideobridge/releases/download/v0.4.1/Muse-Video-Bridge-0.4.1-Windows-x64-portable.zip",
        size: "12.3 MiB",
      },
    ],
    repositoryUrl: "https://github.com/ysf-kul/musevideobridge",
    documentationUrl:
      "https://github.com/ysf-kul/musevideobridge/blob/main/docs/INSTALL.md",
    issuesUrl: "https://github.com/ysf-kul/musevideobridge/issues",
  },
];
