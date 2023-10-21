"use client";

import Academic from "@/components/AcademicJob/Academic";
import Job from "@/components/AcademicJob/Job";
import Trail from "@/lib/animation/trail";
import { useCustomMediaQuery } from "@/lib/hooks/useMediaQuery";
import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

const AcademicJob = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { isTabletOrMobile, isMobile } = useCustomMediaQuery();

  const trailHeight = isMobile ? 530 : isTabletOrMobile ? 600 : 600;

  const ref = useRef(null);

  const isInViewport = useIsInViewport(ref);

  useEffect(() => {
    setIsVisible(isInViewport);
  }, [isInViewport]);

  function useIsInViewport(ref: MutableRefObject<any>) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const observer = useMemo(
      typeof window !== "undefined"
        ? () =>
            new window.IntersectionObserver(([entry]) =>
              setIsIntersecting(entry.isIntersecting)
            )
        : typeof IntersectionObserver !== "undefined"
        ? () =>
            new IntersectionObserver(([entry]) =>
              setIsIntersecting(entry.isIntersecting)
            )
        : () => undefined,
      []
    );

    useEffect(() => {
      observer?.observe(ref.current);

      return () => {
        observer?.disconnect();
      };
    }, [ref, observer]);

    return isIntersecting;
  }

  return (
    <Trail open={isVisible} height={trailHeight}>
      <div className="xl:flex justify-center" ref={ref}>
        <Academic />
        <Job />
      </div>
    </Trail>
  );
};

export default AcademicJob;
