interface Student {
  name: string;
  rollNo: number;
  numOfPresentDays: number;
  isRegular(numOfPresentDays: number): [boolean, number]; // Return a tuple with a boolean and a number
}

const mate: Student = {
  name: "Ayush",
  rollNo: 6,
  numOfPresentDays: 216,
  isRegular: (numOfPresentDays: number): [boolean, number] => {
    let percent = (numOfPresentDays / 365) * 100;
    let isRegular = percent >= 75;
    return [isRegular, percent]; // Return a tuple
  },
};

const [regular, attendancePercentage] = mate.isRegular(mate.numOfPresentDays);
console.log(
  `Is regular: ${regular}, Attendance percentage: ${attendancePercentage}%`
);

// InterFace vs Types

interface animal {
  isWild: boolean;
}

interface alien extends animal {
  properties: string;
}

const newAlien: alien = { isWild: false, properties: "Good looking" };

export {};
