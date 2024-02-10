import { NWD_OPERATIONS, BASIC_OPERATIONS, OS_OPERATIONS, HASH_OPERATIONS, ZIP_OPERATIONS } from './utils/constants.js';
import { cwd } from 'node:process';
import { runNwdOperation } from './commands/nwdOperations.js';
import { runBasicOperation } from './commands/basicOperations.js';
import { runOsInfoOperation } from './commands/osInfoOperations.js';
import { runHashOperation } from './commands/hashOperations.js';
import { runZipOperation } from './commands/zipOperations.js';
import { printCurrentDirectory, closeReadLine, sayBye } from "./utils/utils.js";


export const executCommand = async (userInput, readline, username) => {
    const [operationType, ...args] = userInput.trim().split(/\s+/g); 
    const currentDir = cwd();
    
    try{
        switch (operationType){
            case NWD_OPERATIONS[operationType]:
                await runNwdOperation(operationType, args, currentDir);
                break;
            
            case BASIC_OPERATIONS[operationType]:
                await runBasicOperation(operationType, args);
                break;
    
            case OS_OPERATIONS[operationType]:
                await runOsInfoOperation(args);
                break;
    
            case HASH_OPERATIONS[operationType]:
                await runHashOperation(operationType, args);
                break;
            case ZIP_OPERATIONS[operationType]:
                await runZipOperation(operationType, args);
                break;
            case '.exit':
                closeReadLine(readline);
                sayBye(username);
                break;
    
            default:
                console.log('Invalid input');
                printCurrentDirectory();
        }
    }catch{
        console.log('Operation failed');
    }

}