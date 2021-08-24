export default (email) => {
    let temp = email.includes("@");
    if (temp) {
      return email;
    }
    temp = email + "@fulafia.edu.ng";
    return temp;
  };