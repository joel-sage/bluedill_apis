const date = new Date();
// Destructuring month day and year
const [month, day, year] = [
  date.getMonth(),
  date.getDate(),
  date.getFullYear(),
];

// Destructuring hour time and second
const [hour, minutes, seconds] = [
  date.getHours(),
  date.getMinutes(), 
  date.getSeconds(),
];

// Data formating
const currentDate = `${month}-${day}-${year} ${hour}:${minutes}:${seconds}`;

module.exports = {
    currentDate,
} 