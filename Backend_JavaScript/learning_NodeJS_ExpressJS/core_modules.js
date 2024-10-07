const fs = require("fs");
fs.writeFileSync("read.txt", "My name is Ayush Priyadarshi"); //Checks if the file exists and overwrites if it exists
fs.appendFileSync("read.txt", "  I am great");
const buf_data = fs.readFileSync("read.txt");
console.log(buf_data);
//Node js has an additional data type buffer
//Buffer is used to store binary data
const org_data = buf_data.toString();
console.log(org_data);
//rename the file
fs.renameSync("read.txt", "read_write.txt");
