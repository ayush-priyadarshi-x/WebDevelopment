const myFunc = (num: number) => {
  return num + 1;
};

const getHello = (s: string): string => {
  return (s += s); //return is compulsory in fat arrow function
};
function signUpUser(name: string, email: string, isPaid: Boolean = false) {}

const heros = ["thor", "spiderman", "ironman"];
heros.map((hero): string => {
  return hero;
});

export {};
