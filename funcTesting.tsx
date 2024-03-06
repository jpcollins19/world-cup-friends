//term command === "runfuncs"

const cap1stLetter = (str) => {
  return str
    .split("")
    .map((letter, idx) => {
      if (idx === 0) {
        letter = letter.toUpperCase();
      }

      return letter;
    })
    .join("");
};

const isLastIdx = (arr, idx) => {
  return idx !== arr.length - 1;
};

const addSpace = (arr, idx) => {
  return isLastIdx(arr, idx) ? " " : "";
};

const func = (url) => {
  const string = url.split("/").pop();

  const words = string.split("-");

  return words.reduce((a, word, idx) => {
    // if (word === "in" && userIsLoggedIn) {
    //   a += "Out";
    //
    //   return a;
    // }

    a += cap1stLetter(word);

    // if (word === "rules") {
    //   a += 'password: "password",';
    //
    //   return a;
    // }

    a += addSpace(words, idx);

    return a;
  }, "");
};

console.log(func("/pool-picks"));
