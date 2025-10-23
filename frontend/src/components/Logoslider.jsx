import React, { useEffect, useState, useRef } from "react";

// Fixed LogoSlider (overlap bug resolved)
export default function LogoSlider({ imagesProp, duration = 10, visibleCount = 6 }) {
  const defaultImages = [
    "/img/logo/expleo.png",
    "/img/logo/genpact.png",
    "/img/logo/hcl.png",
    "/img/logo/hp.png",
    "/img/logo/infosys.png",
    "/img/logo/mahindra.png",
    "/img/logo/mindtree.png",
    "/img/logo/3i.png",
  ];

  const images = imagesProp && imagesProp.length ? imagesProp : defaultImages;

  // animation control
  const [isPaused, setIsPaused] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setImagesLoaded(false);

    // preload unique images only once
    const loaders = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(true);
        img.src = src;
      });
    });

    Promise.all(loaders).then(() => {
      if (mountedRef.current) setImagesLoaded(true);
    });

    return () => {
      mountedRef.current = false;
    };
  }, [imagesProp, images.length]);

  // play state for inline style
  const playState = imagesLoaded && !isPaused ? "running" : "paused";

  return (
    <section className="text-center space-y-8 py-16 px-10 rounded-4xl bg-gray-50">
          <h2 className="text-3xl font-bold bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 bg-clip-text text-transparent">
    Our Client
  </h2>
    <div className="relative w-full bg-white py-6 rounded-3xl border border-gray-200">
      <div
        className="logo-track overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        aria-label="Company logos marquee"
        // expose visible count to CSS and a gap variable
        style={{ ["--visible-count"]: visibleCount, ["--gap"]: "1rem" }}
      >
        {/* marquee:= wide container (200% of track) with two groups inside */}
        <div
          className="marquee flex items-center"
          style={{
            animationDuration: `${duration}s`,
            animationPlayState: playState,
            willChange: "transform",
            opacity: imagesLoaded ? 1 : 0,
          }}
        >
          {/* group 1 (original) */}
          <div className="marquee-group flex items-center" role="presentation">
            {images.map((src, idx) => (
              <div
                key={`g1-${idx}`}
                className="logo-item flex-shrink-0 flex justify-center items-center"
              >
                <img
                  src={src}
                  alt={`logo-${idx}`}
                  className="logo-img"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* group 2 (duplicate) - visually identical, used to create perfect loop */}
          <div className="marquee-group flex items-center" aria-hidden="true" role="presentation">
            {images.map((src, idx) => (
              <div
                key={`g2-${idx}`}
                className="logo-item flex-shrink-0 flex justify-center items-center"
              >
                <img
                  src={src}
                  alt={`logo-duplicate-${idx}`}
                  className="logo-img"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* component-specific CSS */}
      <style>{`
        :root {}
        /* animation moves the marquee left by exactly 50% (one group width) */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .logo-track { 
          --visible-count: 5; /* fallback */
          --gap: 1rem;
        }

        .marquee {
          display: flex;
          width: 200%; /* two groups side-by-side -> total width is 200% of the track */
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          gap: 0; /* important: avoid cross-group gap that changes effective width */
          align-items: center;
        }

        /* each group occupies exactly 50% of the marquee (50% of the visible track) */
        .marquee-group {
          display: flex;
          align-items: center;
          flex: 0 0 50%;
          box-sizing: border-box; /* ensure padding is included in the group's layout */
        }

        /* each logo's width is calc(100% / visibleCount) relative to group width.
           box-sizing: border-box ensures paddings don't expand the item past its flex-basis */
        .logo-item {
          flex: 0 0 calc(100% / var(--visible-count));
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-right: var(--gap); /* internal spacing that won't break the 50% group width */
        }

        /* remove extra padding on the last item of each group to keep spacing consistent */
        .marquee-group .logo-item:last-child { padding-right: 0; }

        .logo-img { 
          height: 5rem; 
          max-width: 100%;
          object-fit: contain; 
          display: block;
        }

        /* Pause on hover via CSS so it's consistent with JS pause state */
        .logo-track:hover .marquee { animation-play-state: paused; }

        /* hide scrollbars */
        .logo-track::-webkit-scrollbar { display: none; }
        .logo-track { -ms-overflow-style: none; scrollbar-width: none; }

        @media (max-width: 420px) {
          .logo-track { --gap: 0.5rem; }
          .logo-img { height: 3.5rem; }
        }
      `}</style>
    </div>
    </section>
  );
}
