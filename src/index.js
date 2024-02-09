import { createInterface } from 'node:readline/promises';
import { getUsernameFromArgs, sayHi, sayBye, printCurrentDirectory } from "./utils/utils.js";
import { executCommand } from './fileManager.js';

const startFileManager = () => {
    const username = getUsernameFromArgs();
    sayHi(username);

    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
    }); 

    readline.on('line', async (input) => {
        await executCommand(input);
        printCurrentDirectory();
    });

    readline.on('SIGINT', () => {
        sayBye(username);
        process.exit()
    });

}

startFileManager();




