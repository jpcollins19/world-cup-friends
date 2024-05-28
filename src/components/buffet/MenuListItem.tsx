import * as React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPageTestId,
  getTextFromUrl,
  logout,
  navbarMenuListClass,
  removeForwardSlashFromRoute,
  routes,
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
  const dispatch = useDispatch();

  const menuItemTestId = getPageTestId(
    `menu-list-item-${testId}-${removeForwardSlashFromRoute(route)}`,
  );

  const isSignOutRoute = route === routes.signOut;

  const signOut = () => {
    dispatch(logout());

    onClick();
  };

  const onClickToUse = isSignOutRoute ? signOut : onClick;

  return (
    <Link
      data-testid={menuItemTestId}
      to={isSignOutRoute ? routes.signIn : route}
      id="menuListItem"
      className={`${navbarMenuListClass} ${tw.flexJ} shadow-routesNotSelected px-8`}
      onClick={() => onClickToUse()}
    >
      {getTextFromUrl(route)}
    </Link>
  );
};

export default MenuListItem;
