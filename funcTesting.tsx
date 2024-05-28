//term command === "runfuncs"

const generateRandomGroupOrder = () => {
  const order = [];

  while (order.length < 4) {
    const num = Math.ceil(Math.random() * 4);

    if (!order.includes(num)) {
      order.push(num);
    }
  }

  return order;
};

const generateRandom3rdPlace = () => {
  const order = [];

  while (order.length < 4) {
    const num = Math.ceil(Math.random() * 12);

    if (!order.includes(num)) {
      order.push(num);
    }
  }

  const mapper = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "J",
    11: "K",
    12: "L",
  };

  return order.reduce((a, num, idx) => {
    a.push(mapper[num]);
    return a;
  }, []);
};

console.log(generateRandomGroupOrder());
