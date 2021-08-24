export default (number) => {
    let temp = number.split("");
    if (temp[0] === "+" && temp[1] === "2") {
      return temp.join("");
    }
    // Replace the 0 with +234
    temp.splice(0, 1, "+", "2", "3", "4");
    let newPhone = temp.join("");
    return newPhone;
  };
  