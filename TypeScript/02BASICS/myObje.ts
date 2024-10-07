const user = { name: "Ayush", age: 17 };
const item = { name: "Shampoo", price: 299 };

const createUser = ({ name: String, age: number }): string => {
  return "Object returned";
};

function createItem(): { name: String; price: number } {
  return { name: "Shampoo", price: 299 };
}

createUser({ name: "Ayush", age: 17 });
createItem();

export {};
