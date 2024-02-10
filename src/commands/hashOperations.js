import { printCurrentDirectory } from "../utils/utils.js";
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { normalize } from 'node:path';
import { createHash } from 'crypto';

const calculateHash = async (filePath) => {
    try {
        const [filePathHash] = filePath;
        const readStream = createReadStream(normalize(filePathHash));
        const hash = createHash('sha256');

        await pipeline(readStream, hash);
        console.log(hash.digest('hex'));

        printCurrentDirectory();

    } catch {
        console.log('Error in calculating hash');
    }
}

export const runHashOperation = async (operationType, args) => {
    try {
        switch (operationType) {
            case 'hash': 
                calculateHash(args);
                break;
            default:
                console.log('Invalid input in hash operation');
        }  
    } catch (e) {
        console.log('Error in hash operation')
    }
}