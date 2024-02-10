import { NWD_OPERATIONS } from './utils/constants.js';
import {runNwdOperation} from './commands/nwdOperations.js';
import { cwd } from 'node:process';

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
        

        default:
            console.log('Invalid input');
    }


}