import * as React from "react";
import { Link } from "react-router-dom";
import {
  getPageTestId,
  getTextFromUrl,
  navbarMenuListClass,
  removeForwardSlashFromRoute,
  tw,
} from "../../store";

type MenuListItemProps = {
  testId: string;
  route: string;
  onClick: () => void;
};

export const MenuListItem: React.FunctionComponent<MenuListItemProps> = ({
  route,
  testId,
  onClick,
}) => {
  const menuItemTestId = getPageTestId(
    `menu-list-item-${testId}-${removeForwardSlashFromRoute(route)}`,
  );

  return (
    <Link
      data-testid={menuItemTestId}
      to={route}
      id="menuListItem"
      className={`${navbarMenuListClass} ${tw.flexJ} shadow-routesNotSelected px-8`}
      onClick={() => onClick()}
    >
      {getTextFromUrl(route)}
    </Link>
  );
};

export default MenuListItem;
