const arr1: [] = []; //Empty array type

const arr2: string[] = ["Ayush", "Hitesh", "Aatif"]; //String array type
arr2.push("Anirudhra");

const arr3: number[][] = [
  //Multidimensional array type
  [1, 2, 3],
];
arr3.push([5, 6, 7]);

type user = {
  name: string;
  age: number;
};
const arr4: user[] = [
  //Alias array type
  { name: "Ayush", age: 16 },
  { name: "Aatif", age: 18 },
];
arr4.push({ name: "Sanatan", age: 20 });

export {};
