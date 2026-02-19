import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Float, Sparkles, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * milestones: [{ year, title, text, skills: string[] }]
 */
export default function AIPath3D({ milestones = [] }) {
  const controlsRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  function resetView() {
    const c = controlsRef.current;
    if (!c) return;
    c.object.position.set(0, 1.35, 7.4);
    c.target.set(0.2, 0.55, -0.2);
    c.update();
  }

  // stable refresh angle
  useEffect(() => {
    const t = setTimeout(() => resetView(), 50);
    return () => clearTimeout(t);
  }, []);

  const active = milestones[activeIndex];

  return (
    <div className="card p-5 md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-white/90">Growth Path (3D)</div>
          <div className="mt-1 text-sm text-white/60">Drag to rotate • Scroll to zoom • Click nodes</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetView}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/75 hover:bg-white/10 transition"
          >
            Reset View
          </button>
          {/* <div className="hidden md:block text-xs text-white/45">Three.js • React Three Fiber</div> */}
        </div>
      </div>

      <div className="mt-4 h-[560px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
        <Canvas dpr={[1, 1.75]}>
          <PerspectiveCamera makeDefault position={[0, 1.35, 7.4]} fov={50} />
          <Scene
            milestones={milestones}
            controlsRef={controlsRef}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onOpen={() => setOpen(true)}
          />
        </Canvas>
      </div>

      {/* ONE overlay popup (no 3D skill chips) */}
      {open && active && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-5">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-black/85 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.75)] backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-white/55">Milestone</div>
                <div className="mt-1 text-xl font-semibold text-white/90">
                  {active.year} — {active.title}
                </div>
                <p className="mt-3 text-sm text-white/70">{active.text}</p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/75 hover:bg-white/10 transition"
              >
                Close
              </button>
            </div>

            <div className="mt-5">
              <div className="text-sm font-semibold text-white/85">Skills</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(active.skills || []).map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-white/85"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setActiveIndex((p) => Math.max(0, p - 1))}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/75 hover:bg-white/10 transition"
              >
                ◀ Prev
              </button>

              <div className="text-xs text-white/55">
                {activeIndex + 1} / {Math.max(1, milestones.length)}
              </div>

              <button
                onClick={() => setActiveIndex((p) => Math.min(milestones.length - 1, p + 1))}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/75 hover:bg-white/10 transition"
              >
                Next ▶
              </button>
            </div>
          </div>
        </div>
      )}
{/* 
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/55">
        <Pill>Neon</Pill>
        <Pill>Clean initial view</Pill>
        <Pill>Popup contains skills</Pill>
      </div> */}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white/70">
      {children}
    </span>
  );
}

function Scene({ milestones, controlsRef, activeIndex, setActiveIndex, onOpen }) {
  return (
    <>
      <ambientLight intensity={0.28} />
      <directionalLight position={[6, 7, 6]} intensity={0.95} />
      <pointLight position={[-6, 2, -3]} intensity={0.7} />
      <pointLight position={[3, 1.5, 4]} intensity={0.35} color={"#00E5FF"} />
      <pointLight position={[-3, 2, 2]} intensity={0.22} color={"#A855F7"} />

      <fog attach="fog" args={["#000000", 8, 18]} />

      <Sparkles count={100} speed={0.22} size={1.05} opacity={0.1} scale={[12, 6, 12]} position={[0, 1.0, -2]} />

      <gridHelper args={[30, 42, "rgba(0,229,255,0.05)", "rgba(255,255,255,0.015)"]} position={[0, -2.1, 0]} />

      <PathWorld
        milestones={milestones}
        activeIndex={activeIndex}
        setActiveIndex={(i) => {
          setActiveIndex(i);
          onOpen();
        }}
      />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={3.8}
        maxDistance={10}
        rotateSpeed={0.65}
        zoomSpeed={0.7}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.62}
        target={[0.2, 0.55, -0.2]}
      />
    </>
  );
}

function PathWorld({ milestones, activeIndex, setActiveIndex }) {
  const curve = useMemo(() => {
    const pts = [
      new THREE.Vector3(-3.6, -0.2, 2.0),
      new THREE.Vector3(-2.4, 0.5, 1.0),
      new THREE.Vector3(-1.1, 1.05, 0.2),
      new THREE.Vector3(0.4, 0.4, -0.6),
      new THREE.Vector3(1.8, 1.15, -1.3),
      new THREE.Vector3(3.2, 0.6, -2.0),
    ];
    return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.58);
  }, []);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 320, 0.085, 20, false), [curve]);

  const nodes = useMemo(() => {
    const n = Math.max(2, milestones.length);
    return milestones.map((m, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const p = curve.getPointAt(t);
      return { t, p, m };
    });
  }, [curve, milestones]);

  return (
    <group>
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color={"#00E5FF"}
          emissive={"#00E5FF"}
          emissiveIntensity={0.55}
          roughness={0.35}
          metalness={0.25}
          transparent
          opacity={0.22}
        />
      </mesh>

      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color={"#A855F7"}
          emissive={"#A855F7"}
          emissiveIntensity={0.25}
          roughness={0.65}
          metalness={0.05}
          transparent
          opacity={0.07}
        />
      </mesh>

      <Traveler curve={curve} />

      {nodes.map((node, idx) => (
        <MilestoneNode
          key={idx}
          node={node}
          active={idx === activeIndex}
          onClick={() => setActiveIndex(idx)}
        />
      ))}
    </group>
  );
}

function Traveler({ curve }) {
  const ref = useRef();
  const tRef = useRef(0);

  useFrame((_, delta) => {
    tRef.current = (tRef.current + delta * 0.08) % 1;
    const p = curve.getPointAt(tRef.current);
    ref.current.position.set(p.x, p.y, p.z);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.115, 32, 32]} />
      <meshStandardMaterial
        color={"#ffffff"}
        emissive={"#00E5FF"}
        emissiveIntensity={0.75}
        roughness={0.12}
        metalness={0.15}
      />
    </mesh>
  );
}

function MilestoneNode({ node, active, onClick }) {
  const groupRef = useRef();

  useFrame((state) => {
    const s = active ? 1.1 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.08);
    groupRef.current.lookAt(state.camera.position);
  });

  return (
    <group ref={groupRef} position={[node.p.x, node.p.y, node.p.z]}>
      <Float speed={active ? 2.0 : 1.2} rotationIntensity={0.0} floatIntensity={active ? 0.22 : 0.12}>
        <mesh onClick={onClick}>
          <sphereGeometry args={[active ? 0.19 : 0.16, 32, 32]} />
          <meshStandardMaterial
            color={"#ffffff"}
            emissive={active ? "#00E5FF" : "#A855F7"}
            emissiveIntensity={active ? 0.55 : 0.18}
            roughness={0.25}
            metalness={0.05}
            transparent
            opacity={active ? 0.95 : 0.75}
          />
        </mesh>

        <Html distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div
            style={{
              transform: "translate(-50%, -125%)",
              width: 220,
              transition: "all 180ms ease",
              background: "rgba(0,0,0,0.82)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14,
              padding: "8px 10px",
              color: "rgba(255,255,255,0.92)",
              boxShadow: active
                ? "0 0 26px rgba(0,229,255,0.10), 0 10px 30px rgba(0,0,0,0.55)"
                : "0 10px 25px rgba(0,0,0,0.45)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 11, opacity: 0.6, fontWeight: 800 }}>{node.m.year}</div>
            <div style={{ fontSize: 12, fontWeight: 800 }}>{node.m.title}</div>
          </div>
        </Html>
      </Float>
    </group>
  );
}
