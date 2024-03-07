import { useMediaQuery } from "react-responsive";

export const useIsMobile = (): boolean => {
  return useMediaQuery({ query: "(max-width: 65em)" });
};
