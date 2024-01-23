// interface Props {
//   err: NodeJS.ErrnoException;
//   data: string | [];
//   data2?: string | [];
// }

// const fs = require("fs");

// fs.readFile("./../txt/input.txt", "utf-8", (err: Props, data: Props) => {
//   fs.readFile(`./../txt/output.txt`, "utf-8", (err: Props, data2: Props) => {
//     console.log("First Data" + " " + data);
//     console.log("Second Data" + " " + data);
//     fs.writeFile(
//       "./../outsideText.txt",
//       `${data}\n${data2}`,
//       "utf-8",
//       (err: string) => {
//         if(err){
//             throw new Error(err)
//         }
//       }
//     );
//   });
// });
// console.log("Files Data Read");
