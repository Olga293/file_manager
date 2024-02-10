import { chdir } from 'node:process';
import { dirname, normalize } from 'node:path';
import { homedir } from 'os';
import { readdir } from 'node:fs/promises';
import { printCurrentDirectory } from "../utils/utils.js";

const goUpDirrectory = (currentDir) => {
    if (currentDir != homedir()) {
        const upDirrectoryPath = dirname(currentDir);
        chdir(upDirrectoryPath);
    }else {
        console.log('You are already in the root folder');
    }
}

const goToDirrectory = (newDirrectoryPath) => {
    try {
        const [dirrectoryPath] = newDirrectoryPath;
        chdir(normalize(dirrectoryPath));
    } catch {
        console.log('There is no such directory. Try again');
    }
}

const dirrectoryContentList = async (currentDir) => {
    const directoryContent = await readdir(currentDir, {withFileTypes: true});

    if (directoryContent.length != 0) {
        const foldersArr = [];
        const filesArr = [];

        directoryContent.forEach((value) => {
            if (value.isFile()){
                filesArr.push({name: value.name, type: 'file'});
            }else if (value.isDirectory()){
                foldersArr.push({name: value.name, type: 'folder'});
            }
        });

        filesArr.sort(function(a, b){
            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();
            if (nameA < nameB){
                return -1;
            }
            if (nameA > nameB){
                return 1;
            }
            return 0;
        });
        
        foldersArr.sort(function(a, b){
            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();
            if (nameA < nameB){
                return -1;
            }
            if (nameA > nameB){
                return 1;
            }
            return 0;
        });

        console.table([...foldersArr, ...filesArr]);
    }else{
        console.log('Dirrectory is empty');
    }
}

export const runNwdOperation = async (operationType, args, currentDir) => {
    try {
        switch (operationType) {
            case 'up': 
                goUpDirrectory(currentDir);
                printCurrentDirectory();
                break;
            case 'cd': 
                goToDirrectory(args);
                printCurrentDirectory();
                break;
            case 'ls': 
                await dirrectoryContentList(currentDir);
                printCurrentDirectory();
                break;
            default:
                console.log('Invalid input in navigation operation');
        }  
    } catch (e) {
        console.log('Error in navigation operation')
    }

    
};