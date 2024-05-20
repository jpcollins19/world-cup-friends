import * as React from "react";
import { Link } from "react-router-dom";
import {
  getPageTestId,
  loadingDefault,
  routes,
  stage1DueDate,
  lastDayOfGroupStage,
  firstDayOfKoStage,
  geti18n,
} from "../../store";
import { Loading, LinkText } from "../buffet";

export const Rules: React.FunctionComponent = () => {
  const testId = getPageTestId("rules-page");

  const stageClass = "font-bold text-xl pt-3";
  const listClass = "list-disc pl-8 pb-2";
  const scoringClass = "text-lg";
  const toDo = "text-red-600";

  const signInProps = { route: routes.signIn, text: geti18n("signIn") };

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div data-testid={testId} className="h-full flex flex-col pl-10 pr-96">
      <div className="absolute right-10 top-5 text-2xl">
        <LinkText input={signInProps} />
      </div>

      <div className={stageClass}>Stage 1:</div>

      <ul className={listClass}>
        <li>
          Rank where you think each country will finish in their respective
          group
        </li>
        <li className="italic">
          **Note that you will need to select eight 3rd place teams to advance
          out of their respective group as well**
        </li>
        <li>Stage 1 picks must be submitted before the first game starts on</li>
        <li className={toDo}> {stage1DueDate}</li>
      </ul>

      <div className={scoringClass}>Stage 1 scoring:</div>

      <ul className={listClass}>
        <li>5 pts for predicting the correct country to win the group</li>
        <li>
          4 pts for predicting the correct country to finish 2nd in the group
        </li>
        <li>
          3 pts for predicting the correct country to finish 3rd in the group
          and advance to the knockout stage
        </li>
        <li>
          2 pts for predicting a country to advance to the knockout stage, but
          you did not rank them in the correct 1/2/3 position
        </li>
        <li>
          1 pt for predicting the correct country to finish 3rd in the group
          where team did not advance to the knockout stage
        </li>
        <li>
          1 pt for predicting the correct country to take 4th in the group
        </li>
      </ul>

      <div className={stageClass}>Stage 2:</div>

      <ul className={listClass}>
        <li>Complete a bracket for the knockout stage</li>
        <li>
          We won't know every team that is advancing to the round of 32 until
          the afternoon of
        </li>
        <li className={toDo}>{lastDayOfGroupStage}</li>
        <li>
          I'll be sending out an email in the afternoon on {lastDayOfGroupStage}{" "}
          for you to complete your knockout picks
        </li>
        <li className={toDo}>
          The knockout stage commences the very next day ({firstDayOfKoStage}),
          so there will be a tight turnaround with this stage
        </li>
        <li className="italic">
          **If you do not complete your bracket for the knockout stage by the
          time the first knockout game starts on {firstDayOfKoStage}, your
          knockout picks will be null, and you will not receive any points for
          this stage.**
        </li>
      </ul>

      <div className={scoringClass}>Stage 2 scoring:</div>

      <ul className={listClass}>
        <li>
          1 pt for each team you correctly select to advance to the round of 16
        </li>
        <li>
          2 pts for each team you correctly select to advance to the elite eight
        </li>
        <li>
          4 pts for each team you correctly select to advance to the final four
        </li>
        <li>
          6 pts for each team you correctly select to advance to the final
        </li>
        <li>10 pts for selecting the correct World Cup winner</li>
      </ul>

      <div className={stageClass}>Tiebreaker:</div>

      <ul className={listClass}>
        <li>Total number of goals in the tourney - Price is Right rules</li>
        <li>
          If the tiebreaker comes into play and all applicable tiebreaker
          numbers are over the total goals scored, the closest tiebreaker to the
          total goals scored wins
        </li>
      </ul>

      <div className={stageClass}>Getting Started:</div>

      <ul className={listClass}>
        <li>
          <Link to={routes.createAccount} style={{ color: "blue" }}>
            Create an Account
          </Link>
          , then sign in
        </li>
        <li>Once signed in, navigate to the My Picks tab</li>
      </ul>

      <div className={stageClass}>Payments/Payout:</div>

      <ul className={listClass}>
        <li>$20 entry fee</li>
        <li>Venmo: Joe-Collins-12</li>
        <li>Third place gets their money back</li>
        <li>Winner gets 75% of remaining pot</li>
        <li>2nd place gets the other 25% of remaining pot</li>
      </ul>
    </div>
  );
};

export default Rules;
