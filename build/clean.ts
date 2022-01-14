import * as fs from "fs";

function main(): void {
  const PATH = __dirname + "/../dist";

  if (fs.existsSync(PATH)) {
    fs.rm(PATH, { recursive: true }, () => console.log("clean done"));
  } else {
    console.log("no exist");
  }
}

main();
