import * as React from "react";
import { useGetActiveUsers, useShouldPayoutShow } from "../../hooks";
import { calcPayout, getPageTestId, tw, UserSchema } from "../../store";

export const PayoutData: React.FunctionComponent = () => {
  const activeUsers: UserSchema[] = useGetActiveUsers();

  const [payout, setPayout] = React.useState(calcPayout(activeUsers));

  React.useEffect(() => {
    setPayout(calcPayout(activeUsers));
  }, [activeUsers?.length]);

  const dataTestId = getPageTestId("payoutData");

  const borderClass = "border-solid border-gray-300";
  const boxShadow = "shadow-payoutBorder";

  const placeColumnClass = "min-w-16 text-center p-2";
  const moneyColumnClass = "min-w-32 text-center p-2";

  const shouldPayoutShow: boolean = useShouldPayoutShow();

  return shouldPayoutShow ? (
    <div
      data-testid={dataTestId}
      className={`${tw.flexBoth} shadow-2xl flex-col h-full cursor-default shadow-routesNotSelected`}
    >
      <div className={`${tw.whiteTextMed} text-base pt-2`}>Payout</div>
      <div
        className={`${tw.flexBoth} ${tw.whiteTextMed} ${borderClass} ${boxShadow} text-sm border-2 rounded-lg m-2`}
      >
        <div
          className={`${tw.flexBoth} ${borderClass} ${boxShadow} flex-col border-r`}
        >
          <div className={placeColumnClass}>1st</div>
          <div className={`${placeColumnClass} border-y`}>2nd</div>
          <div className={placeColumnClass}>3rd</div>
        </div>

        <div className={`${tw.flexBoth} flex-col`}>
          <div className={moneyColumnClass}>
            ${payout.firstPlace.toFixed(2)}
          </div>
          <div className={`${moneyColumnClass} border-y`}>
            ${payout.secondPlace.toFixed(2)}
          </div>
          <div className={moneyColumnClass}>
            ${payout.thirdPlace.toFixed(2)}
          </div>
        </div>
      </div>

      <div className={`${tw.whiteTextMed} text-sm pb-2`}>
        # of submitted picks: {payout.numOfPicks}
      </div>
    </div>
  ) : null;
};

export default PayoutData;
