import React, { useRef, useMemo, useEffect } from "react";

export default function BottomScrollListener({ onBottom }) {
  const ref = useRef(null);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) onBottom();
      }),
    [onBottom]
  );

  useEffect(() => {
    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [observer, ref]);

  return <div ref={ref} />;
}
