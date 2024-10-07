const func = (variable: number | string | null): string => {
  if (variable) {
    if (typeof variable === "string") {
      return "The type of varialbe is string";
    } else {
      return "The type of varialbe is number";
    }
  }
  return "The type of varialbe is null";
};
console.log(func("something"));

// In Operator
interface admin {
  name: string;
  email: string;
}

interface user extends admin {
  isAthelete: boolean;
}

const myFunc = (account: admin | user): admin | user => {
  if ("isAthelete" in account) {
    return account; // This is a `user`
  }
  return account; // This is an `admin`
};

// Instance of
const instanceOf = (x: Date | string): string => {
  if (x instanceof Date) {
    return "This is a date.";
  }
  return "This is a string.";
};

export {};
