import { memo } from "react";

/*
 * Ambient backdrop: static aurora light blooms + a few floating glass "3D" objects drawn
 * purely with CSS gradients. Only the small objects animate (transform-only, GPU friendly);
 * the large blooms stay still so the glass panels above them don't re-blur every frame.
 * Animations are disabled automatically under prefers-reduced-motion (see index.css).
 */
function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,#efe7ff_0%,#f6f3fd_45%,#eef3ff_100%)]" />

      {/* Aurora blooms */}
      <div className="absolute -left-[12%] -top-[18%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.42)_0%,rgba(167,139,250,0)_65%)]" />
      <div className="absolute -right-[15%] top-[8%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.32)_0%,rgba(125,211,252,0)_62%)]" />
      <div className="absolute -bottom-[25%] left-[25%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(244,170,214,0.28)_0%,rgba(244,170,214,0)_62%)]" />

      {/* Fine dot grid, faded toward the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(76,29,149,0.09)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />

      {/* Glass sphere */}
      <div className="absolute right-[6%] top-[14%] hidden h-40 w-40 animate-float-slow will-change-transform md:block">
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_32%_28%,#ffffff_0%,#efe4ff_18%,#b79cff_52%,#7c3aed_88%)] opacity-80 shadow-[inset_-18px_-22px_40px_rgba(76,29,149,0.45),0_40px_60px_-30px_rgba(76,29,149,0.45)]" />
        <div className="absolute left-[22%] top-[16%] h-8 w-12 rotate-[-24deg] rounded-full bg-white/70 blur-[6px]" />
      </div>

      {/* Torus ring */}
      <div className="absolute -left-10 bottom-[10%] hidden h-56 w-56 [perspective:800px] lg:block">
        <div className="h-full w-full animate-float-alt will-change-transform">
          <div className="h-full w-full rounded-full bg-[conic-gradient(from_200deg,#c4b5fd,#f0abfc,#93c5fd,#a78bfa,#c4b5fd)] opacity-70 [mask:radial-gradient(circle,transparent_44%,black_45%,black_68%,transparent_69%)] [transform:rotateX(62deg)_rotateZ(18deg)]" />
        </div>
      </div>

      {/* Glossy capsule */}
      <div className="absolute bottom-[18%] right-[4%] hidden animate-float-alt will-change-transform [animation-delay:-6s] xl:block">
        <div className="h-16 w-40 rotate-[-32deg] rounded-full bg-[linear-gradient(135deg,#ffffff_0%,#f5d0fe_30%,#c084fc_70%,#8b5cf6_100%)] opacity-75 shadow-[inset_-10px_-12px_24px_rgba(91,33,182,0.35),0_30px_40px_-24px_rgba(91,33,182,0.5)]" />
      </div>

      {/* Small prism */}
      <div className="absolute left-[38%] top-[6%] hidden animate-float-slow will-change-transform [animation-delay:-9s] lg:block">
        <div className="h-14 w-14 rotate-45 rounded-2xl bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(196,181,253,0.7)_55%,rgba(129,140,248,0.75))] opacity-70 shadow-[inset_-6px_-8px_16px_rgba(79,70,229,0.35)]" />
      </div>
    </div>
  );
}

export default memo(Background);
