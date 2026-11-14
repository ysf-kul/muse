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
          tr: "Muse Video Bridge 0.3.0 Linux masaüstü uygulamasının İngilizce, açık temalı başlangıç ekranı; USB bağlantısı henüz kurulmamış",
          en: "Muse Video Bridge 0.3.0's Linux desktop start screen in English and light theme, with the USB device disconnected",
        },
        caption: {
          tr: "Muse Video Bridge 0.3.0 · Linux · İngilizce · Açık tema · Cihaz bağlı değil",
          en: "Muse Video Bridge 0.3.0 · Linux · English · Light theme · Device disconnected",
        },
        width: 1162,
        height: 891,
      },
    ],
    features: [
      {
        tr: "Yerel MP4 videolarını kalite ve kare hızı seçenekleriyle indeksli JPEG videoya dönüştürür; hesap veya bulut servisi gerekmez.",
        en: "Convert local MP4 files to indexed JPEG video with quality and frame-rate controls; no account or cloud service is required.",
      },
      {
        tr: "Takılı microSD karta USB seri bağlantısıyla gönderim; onaylanan veriyle ilerleme takibi, boyut ve SHA-256 doğrulaması, iptal ve kesilen aktarıma devam etme.",
        en: "Transfer over USB serial to the installed microSD card, with acknowledged progress, size and SHA-256 verification, cancellation, and interrupted-transfer recovery.",
      },
      {
        tr: "ESP32-2432S028R / CYD üzerinde 320×240 tam ekran oynatma. Önceki gerçek cihaz ölçümünde beş aktif dakika boyunca 29,80 FPS elde edildi; ayrı, ortalanmış 304×224 denemeleri yaklaşık 29,97 FPS gördü.",
        en: "Full-screen 320×240 playback on ESP32-2432S028R / CYD. Previous real-device measurements sustained 29.80 FPS over five active minutes; separate centered 304×224 runs reached approximately 29.97 FPS.",
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
          tr: "0.3.0 taşınabilir arşivi ve AppImage açılışı yeni test edildi; AppImage doğrudan FUSE ve çıkarıp çalıştırma modunda açıldı ve temiz kapandı. USB aktarımı ve oynatma önceki gerçek Linux/cihaz testlerinde doğrulandı; bu sürümde yeni fiziksel USB testi yapılmadı.",
          en: "Standalone 0.3.0 tar and AppImage launch were newly tested; AppImage rendered and closed cleanly through direct FUSE and extract-and-run modes. USB transfer and playback were verified in previous real Linux/device tests; this release did not repeat physical USB testing.",
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
        tr: "Cihazda takılı FAT32 microSD kart, veri aktarabilen USB kablosu ve uyumlu Muse Video Bridge ESP32 yazılımı. Uygulama kartı biçimlendirmez.",
        en: "An installed FAT32 microSD card, a USB data cable, and compatible Muse Video Bridge firmware. The application does not format the card.",
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
        tr: "Masaüstü uygulamasında MP4 seç ve dönüştür. Listelenen gerçek USB seri portuna bağlan; USB ile gönder seçeneğini kullan ve son bütünlük doğrulamasını bekle.",
        en: "Select and convert an MP4 in the desktop application. Connect to the actual listed USB serial port, choose Send over USB, and wait for final integrity verification.",
      },
      {
        tr: "Videoyu oynat ve masaüstü kontrollerini kullan. Varsayılan dönüşüm 25 FPS'tir; isteğe bağlı 30 FPS ve kalite ayarlarının sonuçları videoya bağlıdır.",
        en: "Play the video and use the desktop controls. Conversion defaults to 25 FPS; optional 30 FPS and quality settings depend on the source video.",
      },
    ],
    limitations: [
      {
        tr: "Windows doğrulaması Server 2025 üzerindeki sınırlı CI açılış/dönüşüm testiyle sınırlıdır; Windows 10/11 etkileşimli kullanım ve fiziksel USB/oynatma henüz test edilmedi. Linux çalıştırma testi CachyOS x86-64 ile sınırlıdır; DEB/RPM kurulumu Debian, Ubuntu, Fedora ve openSUSE üzerinde doğrulanmadı.",
        en: "Windows verification is limited to the Server 2025 CI launch/conversion smoke; interactive Windows 10/11 use and physical USB/playback remain untested. Linux runtime testing is limited to CachyOS x86-64; DEB/RPM installation on Debian, Ubuntu, Fedora, and openSUSE is unverified.",
      },
      {
        tr: "FPS değerleri önceki donanım ölçümleridir; her video için garanti değildir. Yaklaşık 29,97 FPS sonucu ayrı bir denemedendir, beş dakikalık 320×240 sonucu değildir.",
        en: "FPS figures are previous hardware measurements and are not guarantees for every video. The approximately 29.97 FPS result is from a separate run, not the five-minute 320×240 measurement.",
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
        tr: "USB aktarımı 115200 baud kullanır ve büyük videolarda yavaştır. Aktarım sırasında oynatma duraklar; ani güç kesilmesinin tüm senaryoları doğrulanmadı.",
        en: "USB transfer uses 115200 baud and is slow for large videos. Playback pauses during transfer; all power-loss scenarios have not been qualified.",
      },
    ],
    version: "0.3.0",
    releaseDate: "2026-11-14",
    releaseUrl:
      "https://github.com/ysf-kul/musevideobridge/releases/tag/v0.3.0",
    downloads: [
      {
        label: { tr: "AppImage · x86-64", en: "AppImage · x86-64" },
        platform: "Linux",
        url: "https://github.com/ysf-kul/musevideobridge/releases/download/v0.3.0/Muse-Video-Bridge-0.3.0-Linux-x86_64.AppImage",
        size: "4.1 MiB",
      },
      {
        label: {
          tr: "Taşınabilir arşiv · x86-64",
          en: "Portable archive · x86-64",
        },
        platform: "Linux",
        url: "https://github.com/ysf-kul/musevideobridge/releases/download/v0.3.0/Muse-Video-Bridge-0.3.0-Linux-x86_64.tar.gz",
        size: "3.8 MiB",
      },
      {
        label: { tr: "DEB paketi · amd64", en: "DEB package · amd64" },
        platform: "Linux",
        url: "https://github.com/ysf-kul/musevideobridge/releases/download/v0.3.0/Muse-Video-Bridge-0.3.0-Linux-amd64.deb",
        size: "3.8 MiB",
      },
      {
        label: { tr: "RPM paketi · x86-64", en: "RPM package · x86-64" },
        platform: "Linux",
        url: "https://github.com/ysf-kul/musevideobridge/releases/download/v0.3.0/Muse-Video-Bridge-0.3.0-Linux-x86_64.rpm",
        size: "3.9 MiB",
      },
      {
        label: { tr: "Taşınabilir ZIP · x64", en: "Portable ZIP · x64" },
        platform: "Windows",
        url: "https://github.com/ysf-kul/musevideobridge/releases/download/v0.3.0/Muse-Video-Bridge-0.3.0-Windows-x64-portable.zip",
        size: "12.2 MiB",
      },
    ],
    repositoryUrl: "https://github.com/ysf-kul/musevideobridge",
    documentationUrl:
      "https://github.com/ysf-kul/musevideobridge/blob/main/docs/INSTALL.md",
    issuesUrl: "https://github.com/ysf-kul/musevideobridge/issues",
  },
];
