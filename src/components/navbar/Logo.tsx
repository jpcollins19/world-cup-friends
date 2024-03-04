import * as React from "react";

const worldCupImage =
  "https://rcrusadernews.com/wp-content/uploads/2022/06/World-Cup-900x720.png";

export const Logo: React.FunctionComponent = () => {
  return (
    <img
      src={worldCupImage}
      className="w-full h-auto rounded-md shadow-lg"
      alt="World Cup Logo"
    ></img>
  );
};

export default Logo;
