import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { templateSetFor } from "../../lib/letters";

export const PAGE_WIDTH = 794;
export const PAGE_HEIGHT = 1123;

/**
 * A letter page scaled to the width of its box. With `lazy`, the template is only
 * mounted while the box is near the viewport, so long lists stay fast.
 */
const PagePreview = memo(function PagePreview({ docType, templateName, previewKey, lazy = true, className = "" }) {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0);
  const { ref: inViewRef, inView } = useInView({ rootMargin: "600px 0px", skip: !lazy });
  const data = useMemo(() => JSON.parse(previewKey), [previewKey]);
  const Template = templateSetFor(docType)[templateName];

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    const update = () => setScale(box.clientWidth / PAGE_WIDTH);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  const setRefs = (element) => {
    boxRef.current = element;
    inViewRef(element);
  };
  const visible = !lazy || inView;

  return (
    <div
      ref={setRefs}
      className={`relative w-full overflow-hidden bg-white ${className}`}
      style={{ aspectRatio: `${PAGE_WIDTH} / ${PAGE_HEIGHT}` }}
    >
      {visible && scale > 0 && Template ? (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: PAGE_WIDTH,
            height: PAGE_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
        >
          <Template data={data} type={docType} />
        </div>
      ) : (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-purple-50 via-white to-indigo-50" />
      )}
    </div>
  );
});

export default PagePreview;
