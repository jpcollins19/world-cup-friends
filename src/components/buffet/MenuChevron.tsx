import * as React from "react";
import { getPageTestId, tw } from "../../store";
import MenuListItem from "./MenuListItem";

export type MenuOptionProps = {
  text: string;
  route: string;
};

type MenuChevronProps = {
  testId: string;
  chevronPlacement: string;
  chevron: any;
  menuOptionsPlacement: string;
  menuOptions: MenuOptionProps[];
};

export const MenuChevron: React.FunctionComponent<MenuChevronProps> = ({
  testId,
  chevronPlacement,
  chevron,
  menuOptionsPlacement,
  menuOptions,
}) => {
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  let ref = React.useRef();

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
        (event.target as HTMLElement).className !== "dropdown-option"
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

  return (
    <div data-testid={dataTestId} className={chevronPlacement}>
      <div
        className={`${tw.cursorFingerPointer}`}
        onClick={handleClick}
        ref={ref}
      >
        {chevron}
      </div>

      {click && (
        <div
          className={`${tw.bDodger} ${tw.flexBoth} ${menuOptionsPlacement} flex-col`}
        >
          {menuOptions.map((option, idx) => (
            <MenuListItem key={idx} option={option} onClick={closeMobileMenu} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuChevron;
