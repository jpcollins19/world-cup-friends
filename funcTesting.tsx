const createUrlFromText = (str) => {
  return str
    .split("")
    .map((letter) => {
      if (letter == " ") {
        letter = "-";
      }

      return letter.toLowerCase();
    })
    .join("");
};

console.log(createUrlFromText("Test Text"));
