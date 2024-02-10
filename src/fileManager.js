import { NWD_OPERATIONS, BASIC_OPERATIONS } from './utils/constants.js';
import { cwd } from 'node:process';
import { runNwdOperation } from './commands/nwdOperations.js';
import { runBasicOperation } from './commands/basicOperations.js';
import { printCurrentDirectory } from "./utils/utils.js";


export const executCommand = async (userInput) => {
    const [operationType, ...args] = userInput.trim().split(/\s+/g); 
    const currentDir = cwd();
    
    // console.log(operationType);
    // console.log(args);
    
    // try{
    //     put switch-case here 

    // }catch{
    //     console.log('Operation failed');
    // }

    switch (operationType){
        case NWD_OPERATIONS[operationType]:
            await runNwdOperation(operationType, args, currentDir);
            break;
        
        case BASIC_OPERATIONS[operationType]:
            await runBasicOperation(operationType, args);
            break;

        default:
            console.log('Invalid input');
            printCurrentDirectory();
    }


}