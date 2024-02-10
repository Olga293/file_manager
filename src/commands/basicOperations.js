import { printCurrentDirectory } from "../utils/utils.js";
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { appendFile, rename, rm } from 'node:fs/promises';
import { normalize, join, basename } from 'node:path';

const readFile = async (filePath) => {
    try {
        const [readFilePath] = filePath;
        const readStream = createReadStream(normalize(readFilePath));

        await pipeline(readStream, async function (content) {
                content.setEncoding('utf8');
                for await (const chunk of content) {
                    console.log(chunk);
                }
            },
        );
        printCurrentDirectory();

    } catch {
        console.log('Error in reading file');
    }
}

const createFile = async (fileName) => {
    try {
        const [newFilePath] = fileName;
        await appendFile(newFilePath, '', {flag: 'wx'});

        printCurrentDirectory();

    } catch {
        console.log('Error in creating file');
    }
}

const renameFile = async (renameFileArguments) => {
    try {
        const [oldFilePath, newFilePath] = renameFileArguments;
        await rename(oldFilePath, newFilePath);

        printCurrentDirectory();

    } catch {
        console.log('Error in renaming file');
    }
}

const copyFile = async (copyFileArguments) => {
    try {
        const [filePath, copyFilePath] = copyFileArguments;

        const readStream = createReadStream(filePath, { encoding: 'utf8' });
        const writeStream = createWriteStream(copyFilePath);

        await pipeline(readStream, writeStream);

        printCurrentDirectory();

    } catch {
        console.log('Error in copying file');
    }
}

const moveFile = async (moveFileArguments) => {
    try {
        const [filePath, moveDirPath] = moveFileArguments;

        const moveFilePath = join(moveDirPath, basename(filePath));

        console.log(moveFilePath);

        const readStream = createReadStream(filePath, { encoding: 'utf8' });
        const writeStream = createWriteStream(moveFilePath);

        await pipeline(readStream, writeStream);
        await rm(filePath);

        printCurrentDirectory();

    } catch {
        console.log('Error in moving file');
    }
}

const deleteFile = async (deleteFilePath) => {
    try {
        const [filePath] = deleteFilePath;
        await rm(normalize(filePath));

        printCurrentDirectory();

    } catch {
        console.log('Error in deleting file');
    }
}

export const runBasicOperation = async (operationType, args) => {
    try {
        switch (operationType) {
            case 'cat': 
                readFile(args);
                break;
            case 'add': 
                createFile(args);
                break;
            case 'rn': 
                renameFile(args);
                break;
            case 'cp': 
                copyFile(args);
                break;
            case 'mv': 
                moveFile(args);
                break;
            case 'rm': 
                deleteFile(args);
                break;
            default:
                console.log('Invalid input in basic operation');
        }  
    } catch (e) {
        console.log('Error in basic operation')
    }
}