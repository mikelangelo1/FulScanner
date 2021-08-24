function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }
  
  export const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  
  export const years = range(1950, 2021);
  
  export const days_30 = range(1, 30);
  
  export const days_31 = range(1, 31);
  
  export const days_28 = range(1, 28);
  
  export const days_29 = range(1, 29);
  