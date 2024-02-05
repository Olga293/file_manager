import { FileManager } from "fileManager.js";
import { getUsernameFromArgs, sayHi, sayBye } from "./utils/utils.js";
import os from "node:os";

console.log(process.argv)
console.log(process.argv.slice(2));

const username = getUsernameFromArgs();
sayHi(username);

process.on('SIGINT', () => {
    sayBye(username);
    process.exit()
});

const fileManager = new FileManager(os.homedir());
await fileManager.start();