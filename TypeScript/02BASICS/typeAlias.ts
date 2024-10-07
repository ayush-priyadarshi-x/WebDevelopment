type student = {
  name: string;
  rollNo: number;
  isPresent: boolean;
};

function createStudent(student: student): student {
  return student;
}
createStudent({ name: "Ayush", rollNo: 6, isPresent: true });
export {};

//Readonly and Optional

type creditCardNumber = {
  readonly cardNumber: number; //Readonly
};

type creditCardDate = {
  creditCardDate?: string; //Optional
};

type creditCarDetails = creditCardNumber &
  creditCardDate & {
    cvv: string;
  };
