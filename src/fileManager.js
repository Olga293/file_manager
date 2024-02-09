export const executCommand = async (userInput) => {
    const [operationType, ...args] = userInput.trim().split(/\s+/g); 
    
    console.log(operationType);
    
    try{
        switch (operationType){
            case 'test':
                console.log('Good');
                break;

            default:
                console.log('Invalid input');
        }

    }catch{
        console.log('Operation failed');
    }

}