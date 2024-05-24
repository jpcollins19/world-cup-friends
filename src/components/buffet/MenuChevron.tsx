import * as React from "react";
import { getPageTestId, navbarBackground, tw } from "../../store";
import MenuListItem from "./MenuListItem";

type MenuChevronProps = {
  testId: string;
  chevron: any;
  menuRoutes: string[];
  isMobile?: boolean;
};

export const MenuChevron: React.FunctionComponent<MenuChevronProps> = ({
  testId,
  chevron,
  menuRoutes,
  isMobile,
}) => {
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  let ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    return handleChevronClick(ref, closeMobileMenu);
  }, [click]);

  const handleChevronClick = (
    ref: React.RefObject<HTMLElement> | React.MutableRefObject<undefined>,
    closeMobileMenu: () => void,
  ) => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        (event.target as HTMLElement).id !== "menuListItem"
      ) {
        closeMobileMenu();
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  };

  const dataTestId = getPageTestId(`menu-chevron-${testId}`);
  const iconTestId = getPageTestId(`menu-chevron-icon-${testId}`);
  const menuItemsTestId = getPageTestId(`menu-items-container-${testId}`);

  const chevronPlacement = isMobile ? "" : "h-24 fixed right-10 top-10";
  const menuOptionsPlacement = isMobile ? "" : "fixed right-10 top-15";

  const border =
    "border-solid border-gray-300 border-2 rounded-br-md rounded-bl-md rounded-tl-md shadow-2xl";

  return (
    <div data-testid={dataTestId} className={chevronPlacement}>
      <div
        data-testid={iconTestId}
        className={`${tw.cursorFingerPointer}`}
        onClick={handleClick}
        ref={ref}
      >
        {chevron}
      </div>

      {click && (
        <div
          data-testid={menuItemsTestId}
          className={`${tw.flexBoth} ${navbarBackground} ${menuOptionsPlacement} ${border} flex-col`}
        >
          {menuRoutes.map((route, idx) => (
            <MenuListItem
              key={idx}
              testId={testId}
              route={route}
              onClick={closeMobileMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuChevron;
