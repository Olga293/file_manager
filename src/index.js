import { createInterface } from 'node:readline/promises';
import { getUsernameFromArgs, sayHi, sayBye } from "./utils/utils.js";
import { executCommand } from './fileManager.js';
import { homedir } from 'os';

const startFileManager = () => {
    const startDirectory = homedir();
    process.chdir(startDirectory);

    const username = getUsernameFromArgs();

    sayHi(username);

    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
    }); 

    readline.on('line', async (input) => {
        await executCommand(input, readline, username);
    });

    readline.on('SIGINT', () => {
        sayBye(username);
        process.exit()
    });

}

startFileManager();




