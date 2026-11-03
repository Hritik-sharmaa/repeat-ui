"use client";

import {
  Fragment,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "relative isolate mx-auto max-w-full select-none",
  glass: "absolute",
  filter: "pointer-events-none absolute size-0 overflow-hidden",
  rim: "pointer-events-none absolute inset-0 rounded-[inherit] p-px",
  list: "relative z-10 flex h-full",
  item: "flex h-full min-w-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-full border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70",
  icon: "grid size-6 place-items-center [&>svg]:size-full",
  label:
    "max-w-full truncate px-1 text-[10px] font-semibold leading-none tracking-wide",
  lens: "z-20 cursor-grab touch-none active:cursor-grabbing",
  optic: "pointer-events-none absolute inset-0 rounded-[inherit]",
};

export interface LiquidTab {
  label: string;
  icon: ReactNode;
}

export interface LiquidTabBarProps {
  items: LiquidTab[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  itemWidth?: number;
  height?: number;
  showLabels?: boolean;
  refraction?: number;
  chromatic?: number;
  blur?: number;
  saturation?: number;
  tint?: string;
  tintOpacity?: number;
  specular?: number;
  iconColor?: string;
  activeColor?: string;
  className?: string;
}

const PAD = 6;
const SPRING = { type: "spring", stiffness: 420, damping: 32 } as const;

// SVG filters in backdrop-filter only render in Chromium. Everywhere else the glass falls back to frost.
const subscribe = () => () => {};
const canRefract = () =>
  /Chrome\//.test(navigator.userAgent) &&
  !/Firefox|FxiOS/.test(navigator.userAgent);

// The lens: a displacement map the size of the glass. Inside a band along the edge (the bezel), each pixel
// points inward along the edge's normal, strongest at the rim, so the backdrop bends like light through a
// thick rounded slab. The flat middle is mid-grey, which leaves the backdrop where it is, unless zoom is set.
function lensMap(
  w: number,
  h: number,
  radius: number,
  bezel: number,
  zoom = 0,
) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(w, h);
  const r = Math.min(radius, w / 2, h / 2);
  const hx = w / 2 - r;
  const hy = h / 2 - r;
  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      // Signed distance to a rounded rectangle, and the outward normal at the nearest edge.
      const x = px + 0.5 - w / 2;
      const y = py + 0.5 - h / 2;
      const qx = Math.abs(x) - hx;
      const qy = Math.abs(y) - hy;
      let nx = 0;
      let ny = 0;
      let inside: number;
      if (qx > 0 && qy > 0) {
        const len = Math.hypot(qx, qy);
        inside = r - len;
        nx = (qx / len) * Math.sign(x);
        ny = (qy / len) * Math.sign(y);
      } else if (qx > qy) {
        inside = r - qx;
        nx = Math.sign(x);
      } else {
        inside = r - qy;
        ny = Math.sign(y);
      }
      const t = Math.min(1, Math.max(0, inside / bezel));
      const strength = (1 - t) * (1 - t);
      const i = (py * w + px) * 4;
      // zoom pulls every pixel toward the centre by the same proportion, which magnifies evenly.
      const k = zoom / (Math.min(w, h) / 2);
      const dx = Math.max(-1, Math.min(1, nx * strength + x * k));
      const dy = Math.max(-1, Math.min(1, ny * strength + y * k));
      img.data[i] = 128 - dx * 127;
      img.data[i + 1] = 128 - dy * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}

// The width available inside an element, without its padding.
function contentWidth(el: HTMLElement) {
  const style = getComputedStyle(el);
  return (
    el.clientWidth -
    parseFloat(style.paddingLeft) -
    parseFloat(style.paddingRight)
  );
}

// A colour matrix that keeps one channel (0 red, 1 green, 2 blue) and drops the other two.
const channel = (keep: 0 | 1 | 2) =>
  ["1 0 0 0 0", "0 1 0 0 0", "0 0 1 0 0"]
    .map((row, c) => (c === keep ? row : "0 0 0 0 0"))
    .join(" ") + " 0 0 0 1 0";

type FilterProps = {
  id: string;
  w: number;
  h: number;
  map: string;
  refraction: number;
  chromatic: number;
  blur: number;
  saturation: number;
};

// Softens the backdrop, bends it through the lens map once per colour channel, then recombines the channels,
// so the rim picks up a faint rainbow fringe.
const GlassFilter = ({
  id,
  w,
  h,
  map,
  refraction,
  chromatic,
  blur,
  saturation,
}: FilterProps) => (
  <svg aria-hidden className={C.filter}>
    <filter
      id={id}
      x="0"
      y="0"
      width={w}
      height={h}
      filterUnits="userSpaceOnUse"
      colorInterpolationFilters="sRGB"
    >
      <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="soft" />
      <feImage
        href={map}
        x="0"
        y="0"
        width={w}
        height={h}
        preserveAspectRatio="none"
        result="lens"
      />
      {([0, 1, 2] as const).map((c) => (
        <Fragment key={c}>
          <feDisplacementMap
            in="soft"
            in2="lens"
            scale={refraction * (1 + chromatic * c)}
            xChannelSelector="R"
            yChannelSelector="G"
            result={`bent${c}`}
          />
          <feColorMatrix
            in={`bent${c}`}
            type="matrix"
            values={channel(c)}
            result={`only${c}`}
          />
        </Fragment>
      ))}
      <feBlend in="only0" in2="only1" mode="screen" result="rg" />
      <feBlend in="rg" in2="only2" mode="screen" result="rgb" />
      <feColorMatrix in="rgb" type="saturate" values={String(saturation)} />
    </filter>
  </svg>
);

// A thin bright rim: strongest where the light hits the top-left edge and the bottom-right corner.
const Rim = ({ specular }: { specular: number }) => (
  <span
    aria-hidden
    className={C.rim}
    style={{
      background: `linear-gradient(135deg, rgba(255,255,255,${specular}), rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.02) 65%, rgba(255,255,255,${specular * 0.6}))`,
      mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
      WebkitMask:
        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor",
    }}
  />
);

// A floating tab bar made of liquid glass. The bar bends whatever scrolls beneath it, and a smaller glass lens
// sits on the active tab, magnifying its icon. Pick a tab and the lens slides over, stretching as it goes;
// or grab the lens and drag it, and it snaps to the nearest tab.
const LiquidTabBar = ({
  items,
  value,
  defaultValue = 0,
  onChange,
  itemWidth = 76,
  height = 64,
  showLabels = true,
  refraction = 40,
  chromatic = 0.15,
  blur = 2,
  saturation = 1.6,
  tint = "#ffffff",
  tintOpacity = 0.1,
  specular = 0.7,
  iconColor = "#ffffff",
  activeColor = "#ffffff",
  className = "",
}: LiquidTabBarProps) => {
  const refract = useSyncExternalStore(subscribe, canRefract, () => false);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [inner, setInner] = useState(defaultValue);
  const index = Math.min(items.length - 1, Math.max(0, value ?? inner));
  const select = (i: number) => {
    setInner(i);
    onChange?.(i);
  };

  // Tabs narrow so the bar fits small screens; itemWidth is the most each one takes.
  const [iw, setIw] = useState(itemWidth);
  useEffect(() => {
    const parent = rootRef.current?.parentElement;
    if (!parent) return;
    const fit = (available: number) =>
      setIw(
        Math.max(
          44,
          Math.min(itemWidth, Math.floor((available - PAD * 2) / items.length)),
        ),
      );
    fit(contentWidth(parent));
    const observer = new ResizeObserver(([entry]) =>
      fit(entry.contentRect.width),
    );
    observer.observe(parent);
    return () => observer.disconnect();
  }, [itemWidth, items.length]);

  const W = iw * items.length + PAD * 2;
  const H = height;
  const lensH = H - PAD * 2;
  const barMap = useMemo(
    () => (refract ? lensMap(W, H, H / 2, H * 0.45) : ""),
    [refract, W, H],
  );
  // The lens magnifies what sits under it evenly, and bends a little more at its rim.
  const domeMap = useMemo(
    () => (refract ? lensMap(iw, lensH, lensH / 2, 6, 0.22) : ""),
    [refract, iw, lensH],
  );

  // The lens rides on a spring; how fast it moves stretches it wide and flattens it, like a drop of water.
  const x = useMotionValue(PAD + index * iw);
  const vx = useVelocity(x);
  const scaleX = useSpring(
    useTransform(() => 1 + Math.min(Math.abs(vx.get()) / 2500, 0.3)),
    { stiffness: 500, damping: 28 },
  );
  const scaleY = useSpring(
    useTransform(() => 1 - Math.min(Math.abs(vx.get()) / 2500, 0.3) * 0.45),
    { stiffness: 500, damping: 28 },
  );
  // At rest the selection is a soft pill. While it slides or is dragged it lifts into a glass lens, then
  // settles back once it lands.
  const [lifted, setLifted] = useState(false);
  const pick = (i: number) => {
    if (i === index) return;
    setLifted(true);
    select(i);
  };
  useEffect(() => {
    const controls = animate(x, PAD + index * iw, {
      ...SPRING,
      onComplete: () => setLifted(false),
    });
    return () => controls.stop();
  }, [x, index, iw]);

  const onKeyDown = (e: KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    const next =
      e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : index + step;
    if (next === index || next < 0 || next >= items.length) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  const glassFill = `color-mix(in srgb, ${tint} ${tintOpacity * 100}%, transparent)`;
  const frost = `blur(${blur + 8}px) saturate(${saturation})`;
  const barId = `rui-bar-${uid}`;
  const lensId = `rui-lens-${uid}`;

  return (
    <div
      ref={rootRef}
      className={`${C.root} ${className}`}
      style={{ width: W, height: H }}
    >
      {refract && barMap && (
        <GlassFilter
          id={barId}
          w={W}
          h={H}
          map={barMap}
          refraction={refraction}
          chromatic={chromatic}
          blur={blur}
          saturation={saturation}
        />
      )}
      {refract && domeMap && (
        <GlassFilter
          id={lensId}
          w={iw}
          h={lensH}
          map={domeMap}
          refraction={refraction}
          chromatic={0}
          blur={0}
          saturation={saturation}
        />
      )}

      {/* The bar. */}
      <div
        aria-hidden
        className={C.glass}
        style={{
          inset: 0,
          borderRadius: H / 2,
          background: glassFill,
          backdropFilter: refract ? `url(#${barId})` : frost,
          WebkitBackdropFilter: refract ? `url(#${barId})` : frost,
          boxShadow: `0 18px 40px -16px rgba(0,0,0,0.45), 0 4px 12px -6px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,${specular * 0.6}), inset 0 -1px 1px rgba(255,255,255,${specular * 0.2})`,
        }}
      >
        <Rim specular={specular * 0.8} />
      </div>

      {/* The tabs sit under the lens, so the active icon is seen through it. */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={C.list}
        style={{ padding: PAD }}
        onKeyDown={onKeyDown}
      >
        {items.map((item, i) => {
          const active = i === index;
          return (
            <motion.button
              key={item.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              className={C.item}
              style={{ width: iw, color: active ? activeColor : iconColor }}
              animate={{ opacity: active ? 1 : 0.62 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              onClick={() => pick(i)}
            >
              <motion.span
                className={C.icon}
                animate={{ scale: active ? 1.08 : 1, y: active ? -1 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
              >
                {item.icon}
              </motion.span>
              {showLabels && <span className={C.label}>{item.label}</span>}
            </motion.button>
          );
        })}
      </div>

      {/* The selection: a soft pill you can grab. The glass inside fades in only while it moves. */}
      <motion.div
        aria-hidden
        className={`${C.glass} ${C.lens}`}
        style={{
          left: 0,
          top: PAD,
          width: iw,
          height: lensH,
          borderRadius: lensH / 2,
          x,
          scaleX,
          scaleY,
          background: `color-mix(in srgb, ${tint} ${Math.min(1, tintOpacity + 0.14) * 100}%, transparent)`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,${specular * 0.45}), 0 2px 8px -4px rgba(0,0,0,0.25)`,
        }}
        drag="x"
        dragConstraints={{ left: PAD, right: PAD + (items.length - 1) * iw }}
        dragElastic={0.12}
        dragMomentum={false}
        whileTap={{ scale: 1.06 }}
        whileDrag={{ scale: 1.14 }}
        onPointerDown={() => setLifted(true)}
        onTap={() => setLifted(false)}
        onDragStart={() => setLifted(true)}
        onDragEnd={() => {
          const i = Math.min(
            items.length - 1,
            Math.max(0, Math.round((x.get() - PAD) / iw)),
          );
          setLifted(true);
          animate(x, PAD + i * iw, {
            ...SPRING,
            onComplete: () => setLifted(false),
          });
          if (i !== index) select(i);
        }}
      >
        <motion.span
          className={C.optic}
          style={{
            backdropFilter: refract
              ? `url(#${lensId})`
              : `blur(2px) saturate(${saturation})`,
            WebkitBackdropFilter: refract
              ? `url(#${lensId})`
              : `blur(2px) saturate(${saturation})`,
            boxShadow: `0 8px 20px -8px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,${specular * 0.8}), inset 0 -1px 1px rgba(255,255,255,${specular * 0.3})`,
          }}
          initial={false}
          animate={{ opacity: lifted ? 1 : 0 }}
          transition={{ duration: lifted ? 0.15 : 0.35, ease: "easeOut" }}
        >
          <Rim specular={specular} />
        </motion.span>
      </motion.div>
    </div>
  );
};

export default LiquidTabBar;
