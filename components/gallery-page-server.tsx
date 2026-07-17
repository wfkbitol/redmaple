import { GalleryScene } from "@/components/gallery-scene";
import { getTranslation, type Locale } from "@/lib/i18n";
import { MapleLeaf, ImageIcon } from "@/components/icons";

export default function GalleryPageServer({ locale }: { locale: Locale }) {
  const translation = getTranslation(locale);

  const galleryItems = locale === "en"
    ? [
        { title: "Burning Particle Cloud", description: "A subtle offset and gradient make cards feel like leaves flipping in the wind when you move the mouse." },
        { title: "Layered Halo", description: "Each ring of glow feels like the distant fire of a maple forest slowly brightening from the dark." },
        { title: "Interactive Starfield", description: "The points of light drift lazily, giving the page a little restless rhythm at night." },
      ]
    : [
        { title: "燃烧的粒子云", description: "通过轻微偏移和色彩渐变，让卡片在移动鼠标时像一片落叶在风里翻动。" },
        { title: "层叠的光晕", description: "每一层圆形光圈的渐变都像远处枫林的火，缓慢地从暗处亮起来。" },
        { title: "微交互星图", description: "点点星光在懒懒地漂移，给页面增加一点夜里不安分的节奏。" },
      ];

  return (
    <div className="hero-section relative min-h-screen">
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: "var(--color-accent)" }}>
              <ImageIcon size={20} />
            </span>
            <span className="text-sm font-medium tracking-[0.12em] uppercase" style={{ color: "var(--color-accent)" }}>
              Gallery
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: "var(--color-fg-primary)" }}>
            {translation.galleryPage.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--color-fg-secondary)" }}>
            {translation.galleryPage.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[28px] card-glass p-1">
            <GalleryScene translation={translation.galleryScene} />
          </div>
          <div className="flex flex-col gap-4">
            {galleryItems.map((item, idx) => (
              <div
                key={item.title}
                className="card p-6"
                style={{ animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + idx * 0.1}s both` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ color: "var(--color-accent)" }}>
                    <MapleLeaf size={18} />
                  </span>
                  <h2 className="text-lg font-semibold" style={{ color: "var(--color-fg-primary)" }}>
                    {item.title}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-fg-secondary)" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
