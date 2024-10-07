// Tuples

let user: [string, number];
user = ["Ayush", 12];
user.push("This method fails here."); //push can be used

// Enums
const enum seatChoice {
  AISLE = "aisle",
  MIDDLE = "middle",
  WINDOW = "window",
}
const hcSeat = seatChoice.AISLE;

export {};
