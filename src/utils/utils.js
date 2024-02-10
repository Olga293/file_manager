import { cwd } from 'node:process';

const userNameKey = '--username=';
const defaultUserName = 'Stranger';

export const getUsernameFromArgs = () => {
    const args = process.argv.slice(2);
    let username = args.find((value) => value.startsWith(userNameKey));
    if(username){
        username = username.replace(userNameKey, '');
    }else{
        username = defaultUserName;
    }

    return username;
};

export const sayHi = (username) => {
    console.log(`Welcome to the File Manager, ${username}!`);
};

export const sayBye = (username) => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};

export const printCurrentDirectory = () => {
    const currentDir = cwd();
    console.log(`You are currently in ${currentDir}`);
};

export const closeReadLine = (readline) => {
    readline.close();
};