export const submitAction = async (a) => {
  "use server";
  console.log("Email: " + a.get("email"));
  console.log("Password: " + a.get("password"));
};
