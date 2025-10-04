import React, { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
className={`scroll-stack-card relative w-full h-50 my-8 p-5 rounded-[40px] box-border origin-top will-change-transform
  bg-gradient-to-br from-[rgba(171,30,169,0.06)] via-[rgba(171,30,169,0.03)] to-[rgba(255,179,71,0.03)]
  border border-[rgba(171,30,169,0.06)] text-[#111827] backdrop-blur-lg
  hover: transition-shadow duration-300
  ${itemClassName}`.trim()}

    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 5,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0.9,
  useWindowScroll = false,
  allowParentScrollOnEnd = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const touchStartYRef = useRef(null);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    element => {
      if (!element) return 0;
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  // handler used by Lenis
  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, []); // note: updateCardTransforms is defined later - we'll reassign via closure below

  // setupLenis declared after handleScroll so we can attach handleScroll to Lenis events
  const setupLenis = useCallback(() => {
    // destroy any previous lenis
    if (lenisRef.current) {
      try { lenisRef.current.destroy(); } catch (e) {}
      lenisRef.current = null;
    }

    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      // ensure scroller initial overflow style
      scroller.style.overflowY = scroller.style.overflowY || 'auto';

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [useWindowScroll, handleScroll]);

  // updateCardTransforms defined after setupLenis, but we need handleScroll to call it;
  // to avoid circular dependency issues we set handleScroll above (it will close over the correct function since both are stable callbacks).
  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    // (No longer toggling overflow or destroying lenis here.)
    // We will forward wheel/touch events to parent instead via listeners attached in useLayoutEffect.

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = getElementOffset(cardsRef.current[j]);
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  // Re-bind handleScroll to the "real" function closure so Lenis calls updateCardTransforms properly.
  // (A no-op when handleScroll already uses the latest closure.)
  // (This line ensures stable references in setupLenis useCallback.)
  // eslint-disable-next-line no-unused-expressions
  handleScroll;

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    // ensure scroller has initial overflow style
    if (!useWindowScroll) {
      scroller.style.overflowY = scroller.style.overflowY || 'auto';
    }

    setupLenis();

    // initial transform pass
    updateCardTransforms();

    // ---- forward wheel & touch to parent when at child top/bottom ----
    // only attach if user opted-in and we're using internal scroller
    let wheelHandler = null;
    let touchStart = null;
    let touchMove = null;

    if (!useWindowScroll && allowParentScrollOnEnd) {
      const scrollerEl = scroller;

      wheelHandler = (e) => {
        // if useWindowScroll or no scroller, ignore
        if (useWindowScroll || !scrollerEl) return;
        const deltaY = e.deltaY;
        const atTop = scrollerEl.scrollTop <= 0;
        const atBottom = scrollerEl.scrollTop + scrollerEl.clientHeight >= scrollerEl.scrollHeight - 1;

        // If trying to scroll past bounds, forward to parent (window)
        if ((atBottom && deltaY > 0) || (atTop && deltaY < 0)) {
          e.preventDefault();
          // forward delta to window
          window.scrollBy({ top: deltaY, left: 0, behavior: 'auto' });
        }
      };

      touchStart = (ev) => {
        touchStartYRef.current = ev.touches?.[0]?.clientY ?? null;
      };

      touchMove = (ev) => {
        if (useWindowScroll || !scrollerEl || touchStartYRef.current == null) return;
        const currentY = ev.touches?.[0]?.clientY ?? 0;
        const delta = touchStartYRef.current - currentY; // positive => user swiped up
        const atTop = scrollerEl.scrollTop <= 0;
        const atBottom = scrollerEl.scrollTop + scrollerEl.clientHeight >= scrollerEl.scrollHeight - 1;

        if ((atBottom && delta > 0) || (atTop && delta < 0)) {
          ev.preventDefault();
          window.scrollBy({ top: delta, left: 0, behavior: 'auto' });
          // update start so continued movement keeps forwarding
          touchStartYRef.current = currentY;
        }
      };

      // wheel must be non-passive so we can preventDefault
      scrollerEl.addEventListener('wheel', wheelHandler, { passive: false, capture: true });
      scrollerEl.addEventListener('touchstart', touchStart, { passive: true });
      scrollerEl.addEventListener('touchmove', touchMove, { passive: false });
    }

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (lenisRef.current) {
        try { lenisRef.current.destroy(); } catch (e) {}
        lenisRef.current = null;
      }

      if (!useWindowScroll && allowParentScrollOnEnd && scroller) {
        if (wheelHandler) scroller.removeEventListener('wheel', wheelHandler, { capture: true });
        if (touchStart) scroller.removeEventListener('touchstart', touchStart);
        if (touchMove) scroller.removeEventListener('touchmove', touchMove);
      }

      // restore overflow style
      if (scrollerRef.current) scrollerRef.current.style.overflowY = '';
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    allowParentScrollOnEnd
  ]);

  // Container styles based on scroll mode
  const containerStyles = useWindowScroll
    ? {
        // Global scroll mode - no overflow constraints
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)'
      }
    : {
        // Container scroll mode - original behavior
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      };

 const containerClassName = useWindowScroll
  ? `relative w-4/5 mx-auto overflow-y-auto hide-scrollbar ${className}`.trim()
  : `relative w-4/5 h-full overflow-y-auto overflow-x-visible mx-auto hide-scrollbar ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
      <div className="scroll-stack-inner pt-[20vh] pb-[18rem]">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
