"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCode, FiLayers, FiCpu, FiHeart } from "react-icons/fi";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ==========================================
// 3D Background Components
// ==========================================

function InteractiveIcosahedron() {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const wireframeRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !coreRef.current || !wireframeRef.current) return;

    // 1. Constant slow rotation for the geometry
    coreRef.current.rotation.x += delta * 0.1;
    coreRef.current.rotation.y += delta * 0.15;
    wireframeRef.current.rotation.x += delta * 0.1;
    wireframeRef.current.rotation.y += delta * 0.15;

    // 2. Smooth mouse tracking (tilt) for the parent group
    const targetX = (state.pointer.y * Math.PI) / 8;
    const targetY = (state.pointer.x * Math.PI) / 8;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      {/* Inner solid shape - PREMIUM PHYSICAL MATERIAL */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshPhysicalMaterial
          color="#020617"
          metalness={0.9}
          roughness={0.2}
          clearcoat={1.0} // High gloss premium finish
          clearcoatRoughness={0.15} // Sharp reflections
          reflectivity={1}
        />
      </mesh>

      {/* Outer glowing wireframe */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[2.51, 1]} />
        <meshPhysicalMaterial
          color="#4f46e5"
          emissive="#6366f1" // Self-illuminating glow
          emissiveIntensity={0.8}
          wireframe={true}
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}

// Hook to detect mobile devices
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth > 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isDesktop;
}

// ==========================================
// UI Components & Constants
// ==========================================

const draw = {
  pathLength: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  fill: "none",
  strokeLinecap: "round",
  className: "stroke-indigo-500/20 transition-all duration-700 group-hover:stroke-indigo-400/60 animate-svg-draw",
};

function CardArt({ variant }) {
  return (
    <svg
      viewBox="0 0 420 220"
      preserveAspectRatio="xMidYMid slice"
      className="why-card-art pointer-events-none absolute right-0 top-0 h-full w-[65%] sm:w-[55%]"
      aria-hidden="true"
    >
      {variant === "grid" && (
        <g strokeWidth="1" className="animate-svg-float">
          {[28, 64, 100, 136, 172, 208].map((y, i) => (
            <path key={`h-${y}`} {...draw} style={{ animationDelay: `${i * 0.08}s` }} d={`M0 ${y} H420`} />
          ))}
          {[30, 100, 170, 240, 310, 380].map((x, i) => (
            <path key={`v-${x}`} {...draw} style={{ animationDelay: `${0.3 + i * 0.08}s` }} d={`M${x} 0 L${x - 48} 220`} />
          ))}
        </g>
      )}
      {variant === "nodes" && (
        <g strokeWidth="1.2" className="animate-svg-float">
          <path {...draw} d="M10 160 C80 30, 150 40, 210 110 S300 190, 410 60" />
          <path {...draw} style={{ animationDelay: "0.3s" }} d="M30 70 C120 160, 220 20, 400 140" />
          {[[80, 72], [210, 110], [300, 155], [400, 140], [410, 60]].map(([cx, cy], i) => (
            <circle key={i} {...draw} style={{ animationDelay: `${0.6 + i * 0.1}s` }} cx={cx} cy={cy} r="4" fill="currentColor" className="fill-transparent stroke-indigo-500/30 group-hover:fill-indigo-400/50 transition-colors duration-500" />
          ))}
        </g>
      )}
      {variant === "signal" && (
        <g strokeWidth="1.2" className="animate-svg-float">
          <path {...draw} d="M0 168 H70" />
          <path {...draw} style={{ animationDelay: "0.2s" }} d="M70 168 C140 168, 160 28, 250 28 S350 160, 420 70" />
          <path {...draw} style={{ animationDelay: "0.4s" }} d="M10 112 C100 112, 150 58, 250 58 S360 140, 420 96" />
          {[[70, 168], [250, 28], [350, 100]].map(([cx, cy], i) => (
            <circle key={i} {...draw} style={{ animationDelay: `${0.7 + i * 0.12}s` }} cx={cx} cy={cy} r="4" fill="currentColor" className="fill-transparent stroke-indigo-500/30 group-hover:fill-indigo-400/50 transition-colors duration-500" />
          ))}
        </g>
      )}
      {variant === "search" && (
        <g strokeWidth="1.2" className="animate-svg-float">
          {[24, 44, 64].map((r, i) => (
            <circle key={r} {...draw} style={{ animationDelay: `${i * 0.14}s` }} cx="310" cy="64" r={r} />
          ))}
          <path {...draw} style={{ animationDelay: "0.45s" }} d="M0 170 H110 L160 116 H250" />
          <path {...draw} style={{ animationDelay: "0.65s" }} d="M20 136 H140" />
          {[[110, 170], [160, 116], [250, 116]].map(([cx, cy], i) => (
            <circle key={i} {...draw} style={{ animationDelay: `${0.85 + i * 0.1}s` }} cx={cx} cy={cy} r="3.5" fill="currentColor" className="fill-transparent stroke-indigo-500/30 group-hover:fill-indigo-400/50 transition-colors duration-500" />
          ))}
        </g>
      )}
    </svg>
  );
}

const features = [
  {
    icon: FiCode,
    art: "grid",
    title: "Web & App Engineering",
    text: "We ship innovative, high-performance web platforms and mobile applications tailored for speed, scale, and seamless user experiences.",
    detail: "From React/Node.js stacks to cross-platform mobile apps, we utilize modern frameworks to ensure your application is scalable, secure, and future-proof."
  },
  {
    icon: FiLayers,
    art: "nodes",
    title: "Software Integration",
    text: "Connecting the dots of your digital ecosystem. We build robust, reliable integrations that streamline workflows and drive operational efficiency.",
    detail: "We seamlessly connect third-party APIs, enterprise CRMs, and payment gateways into unified dashboards, eliminating data silos in your business."
  },
  {
    icon: FiCpu,
    art: "signal",
    title: "Digital Transformation",
    text: "Modernize legacy systems with technology-driven excellence. We empower your business to scale, adapt, and unlock new avenues for growth.",
    detail: "We audit outdated tech debt, migrate workloads to secure cloud infrastructures, and automate manual workflows to drastically reduce operational overhead."
  },
  {
    icon: FiHeart,
    art: "search",
    title: "Partners, Not Vendors",
    text: "Every milestone stems from the trust we earn. As your Nagpur-based technical partners, we are deeply committed to your long-term success.",
    detail: "You get direct access to our core engineering team. We prioritize transparent communication, agile delivery, and round-the-clock technical support."
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

// ==========================================
// Main Component
// ==========================================

export default function WhyChooseUs() {
  const isDesktop = useIsDesktop();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative overflow-hidden bg-[#030712] py-24 font-sans selection:bg-indigo-500/30 min-h-screen flex items-center">

      {/* 3D WebGL Background */}
      {isDesktop && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.4} />

            {/* Premium Lighting Setup for Physical Materials */}
            {/* Key light: Sharp, cast shadows, aimed directly at the clearcoat */}
            <spotLight
              position={[10, 15, 10]}
              angle={0.3}
              penumbra={1}
              intensity={3}
              color="#e0e7ff"
            />
            {/* Edge lighting to highlight the geometry contours */}
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#c084fc" />
            <pointLight position={[5, -5, 5]} intensity={0.8} color="#818cf8" />

            <Suspense fallback={null}>
              <InteractiveIcosahedron />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Abstract Startup Glow Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-screen pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-900/30 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-900/20 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center pointer-events-auto"
        >
          <div className="inline-flex items-center justify-center space-x-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
              The SS Infotech Advantage
            </span>
          </div>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Built for <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Scale.</span><br />
            Driven by <span className="text-white">Trust.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
            We deliver innovative IT solutions that empower businesses to achieve efficiency and growth. We don't just write code; we engineer long-term technological excellence.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 pointer-events-auto">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isHovered = isDesktop && hoveredIndex === i;

            return (
              <motion.article
                layout
                key={feature.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                onHoverStart={() => isDesktop && setHoveredIndex(i)}
                onHoverEnd={() => isDesktop && setHoveredIndex(null)}
                animate={isHovered ? { scale: 1.03, zIndex: 10 } : { scale: 1, zIndex: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`group relative overflow-hidden rounded-3xl border transition-colors backdrop-blur-md ${isHovered
                    ? 'border-indigo-500/50 bg-white/[0.05] shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]'
                    : 'border-white/10 bg-white/[0.02] shadow-2xl hover:border-indigo-500/30 hover:bg-white/[0.04]'
                  }`}
              >
                <CardArt variant={feature.art} />

                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-violet-500/0 opacity-0 transition-opacity duration-500 group-hover:from-indigo-500/10 group-hover:to-violet-500/5 group-hover:opacity-100 pointer-events-none" />

                <div className="relative z-10 flex h-full flex-col justify-between rounded-[1.25rem] bg-gradient-to-br from-slate-950/90 to-slate-950/40 p-6 sm:p-8 border border-white/5">
                  <motion.div layout className="flex-1">
                    <motion.div layout className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:bg-indigo-500/20">
                      <Icon className="h-6 w-6" />
                    </motion.div>

                    <motion.h3 layout className="text-xl font-bold tracking-tight text-slate-100">
                      {feature.title}
                    </motion.h3>

                    <motion.p layout className="mt-3 text-sm leading-relaxed text-slate-400">
                      {feature.text}
                    </motion.p>

                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden border-t border-indigo-500/20 pt-4"
                        >
                          <p className="text-sm leading-relaxed text-indigo-200">
                            {feature.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div layout className="mt-8 flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-600 transition-colors group-hover:text-indigo-400/80">
                    <span className="mr-3 h-[1px] w-8 bg-slate-800 group-hover:bg-indigo-500/50 transition-colors" />
                    0{i + 1}
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <style>{`
          .why-card-art {
            -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 30%, #000 70%);
            mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 30%, #000 70%);
          }
          @keyframes svg-draw {
            to { stroke-dashoffset: 0; }
          }
          .animate-svg-draw {
            animation: svg-draw 2s cubic-bezier(0.2, 1, 0.2, 1) forwards;
          }
          @keyframes svg-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .animate-svg-float {
            animation: svg-float 8s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-svg-draw,
            .animate-svg-float { animation: none; }
            .animate-svg-draw { stroke-dashoffset: 0; }
          }
        `}</style>
      </div>
    </section>
  );
}