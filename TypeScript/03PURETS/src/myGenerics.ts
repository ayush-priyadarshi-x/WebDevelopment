//Generics
const score: Array<number> = [];
const names: Array<string> = [];

function identitiyOne(val: boolean | number): boolean | number {
  return val;
}

function identitiyTwo(val: any): any {
  return val;
}

function identitiyThree<Type>(val: Type): Type {
  return val;
}

function identityFour<T>(val: T): T {
  return val;
}

// Generics in Array and Fat Arrow functions
const getMoreProducts = <Ty>(products: Ty[]): Ty => {
  let one = products[0];
  return one;
};

//Generic classes
interface something {
  name: string;
  kingdom: number;
  subKingdom: string;
}

const anotherFunction = <T, U extends something>(
  index: T,
  description: U
): object => {
  return {};
};

anotherFunction(1, { name: "Ayush", kingdom: 1, subKingdom: "Thallophytes" });

export {};
