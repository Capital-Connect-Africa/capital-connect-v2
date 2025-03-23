export const objTostr =(message: string | string[] | Record<string, any> | Record<string, any>[]): string =>{

    // case 1: message is a string
    if (typeof message === 'string') return message;
  
    // case 2: message is array
    if (Array.isArray(message)) {
      if (typeof message[0] === 'string') { 
        return message.join(', '); // array of strings
      } else { // array of objects
        return message.map((obj) => Object.values(obj).join(', ')).join(', ');
      }
    }
  
    // case 3: message is object
    if (typeof message === 'object' && message !== null) {
      return Object.values(message).join(', ');
    }
    
    return 'Unknown error message';
  }