// Corrected User class
class User {
  email: string;
  name?: string;
  readonly city: string = ""; // City is readonly and can be initialized directly or in the constructor

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }
}

const Ayush = new User("something@gmail.com", "Ayush");
let cityName = Ayush.city;

// Corrected student class with public/private fields
class Student {
  constructor(
    public name: string,
    public email: string,
    public age: number,
    private studentId?: string // Allowing any string, not just "student1"
  ) {}
}

const anirudhra = new Student("Ayush", "something@gmail.com", 17);

//Getters and Setters
class product {
  constructor(
    public name: string,
    // private manufacturer: string,// Can only be used in the class
    protected manufacturer: string, // Can be used in both class and inhertance
    public price: number
  ) {}

  get nameTag(): string {
    return `The name is ${this.name}`;
  }
  get priceTag(): string {
    return `The price is ${this.price}`;
  }

  set pricetag(price: number) {
    if (price == 0) {
      throw new Error("Price is not valid.");
    }
    this.price = price;
  }
}

class subProduct extends product {}

export {};
