import { fireEvent, render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import store, { AuthState, LastUpdatedSchema, UserSchema } from "../../store";
import * as React from "react";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import {
  useGetActiveUsers,
  useGetLastUpdated,
  useGetUser,
  useIsMobile,
  useIsUserAdmin,
  useIsUserLoggedIn,
  useShouldPayoutShow,
} from "../../hooks";
import { Formik } from "formik";

export const renderWithRouter = (component: any) => {
  return render(<Router>{component}</Router>);
};

export const renderWithProvider = (component: any) => {
  render(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>,
  );
};

export const renderWithMemoryRouter = (
  component: any,
  initialEntries: string,
) => {
  render(
    <MemoryRouter initialEntries={[initialEntries]}>{component}</MemoryRouter>,
  );
};

export const renderWithFormik = (
  component: any,
  initialValues: any,
  onSubmit: any,
) => {
  render(
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {component}
    </Formik>,
  );
};

export const getTestIdTag = (testId: string) => {
  return screen.findByTestId(testId as any);
};

export const queryTestIdTag = (testId: string) => {
  return screen.queryByTestId(testId as any);
};

export const getTextFieldTag = async (label: string) => {
  return await getTestIdTag(`text-field-input-${label}`);
};

export const getText = (text: string) => {
  return screen.queryByText(text as any);
};

export const changeInputText = async (input: any, text: string) => {
  fireEvent.change(input, { target: { value: text } });
};

export const click = (input: any) => {
  // act(() => {
  //   fireEvent.click(input);
  // });

  fireEvent.click(input);
};

export const submit = async (input: any) => {
  act(() => {
    fireEvent.submit(input);
  });
};

export const matchMediaWorkAround = () => {
  return Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

export const getButtonTestId = (str: string, isMobile?: boolean) => {
  const mobileAppendage = isMobile ? "-mobile" : "";

  return getTestIdTag(`button-cont-${str}${mobileAppendage}`);
};

export const getButton = async (str: string, isMobile?: boolean) => {
  const testId = await getButtonTestId(str, isMobile);

  return testId.querySelector("button");
};

export const getEmailTextInput = async () => {
  return await getTextFieldTag("email");
};

export const getPwTextInput = async () => {
  return await getTextFieldTag("password");
};

export const getRouteTestId = async (route: string) => {
  const routeTestId = `comp-route-${route}`;

  return await getTestIdTag(routeTestId);
};

export const mockWindowMobileView = (boolean: boolean) => {
  return require("react-responsive").useMediaQuery.mockReturnValue(boolean);
};

const mockReturnedValue = (hookToMock: any, value: any) => {
  const hook = hookToMock as jest.MockedFunction<any>;

  hook.mockReturnValue(value);
};

export const mockUseIsMobile = (boolean: boolean) => {
  mockReturnedValue(useIsMobile, boolean);
};

export const mockUseGetActiveUsers = (users: UserSchema[]) => {
  mockReturnedValue(useGetActiveUsers, users);
};

export const mockUseShouldPayoutShow = (boolean: boolean) => {
  mockReturnedValue(useShouldPayoutShow, boolean);
};

export const mockUseIsUserLoggedIn = (boolean: boolean) => {
  mockReturnedValue(useIsUserLoggedIn, boolean);
};

export const mockUseIsUserAdmin = (boolean: boolean) => {
  mockReturnedValue(useIsUserAdmin, boolean);
};

export const mockUseGetLastUpdated = (lastUpdated: LastUpdatedSchema) => {
  mockReturnedValue(useGetLastUpdated, lastUpdated);
};

export const mockUseGetUser = (user: any) => {
  mockReturnedValue(useGetUser, user);
};
