import { useMediaQuery } from "react-responsive";

export const useCustomMediaQuery = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)"
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return { isDesktopOrLaptop, isBigScreen, isTabletOrMobile, isMobile };
};
