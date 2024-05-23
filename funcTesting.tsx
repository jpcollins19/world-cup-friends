//term command === "runfuncs"

const func = (route) => {
  return route.split("/").pop();
};

console.log(func("/pool-picks"));
