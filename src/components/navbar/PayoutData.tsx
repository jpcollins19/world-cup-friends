import * as React from "react";
import { useGetActiveUsers } from "../../hooks";

export const PayoutData: React.FunctionComponent = () => {
  const activeUsers = useGetActiveUsers();

  //const [payout, setPayout] = useState(calcPayout(activeUsers));

  // React.useEffect(() => {
  //   setPayout(calcPayout(activeUsers));
  // }, [activeUsers?.length]);

  //shouldPayoutShow ? return div : null

  return (
    <div
    // data-testid={dataTestId}
    // className={`${tw.flexBoth} shadow-2xl flex-col h-full`}
    >
      {/*<Logo isMobile={isMobileResult} />*/}

      {/*<NavbarComp />*/}
    </div>
  );
};

export default PayoutData;
