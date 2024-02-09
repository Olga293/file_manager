

export const executCommand = async (userInput) => {
    const [operationType, ...args] = userInput.trim().split(/\s+/g); 
    
    
    console.log(operationType);
    

  }