import { printCurrentDirectory } from "../utils/utils.js";
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { normalize, } from 'node:path';
import { rm } from 'node:fs/promises';

const compressFile = async (compressArguments) => {
    try {
        const [filePath, compressFilePath] = compressArguments;

        const fileToCompress = createReadStream(normalize(filePath));
        const compressedFile = createWriteStream(normalize(compressFilePath));
        const compress = createBrotliCompress();

        await pipeline(fileToCompress, compress, compressedFile);
        await rm(normalize(filePath));

        printCurrentDirectory();

    } catch {
        console.log('Error in compressing file');
    }
};

const decompressFile = async (decompressArguments) => {
    try {
        const [filePath, decompressFilePath] = decompressArguments;

        const fileToDeompress = createReadStream(normalize(filePath));
        const decompressedFile = createWriteStream(normalize(decompressFilePath));
        const decompress = createBrotliDecompress();

        await pipeline(fileToDeompress, decompress, decompressedFile);
        await rm(normalize(filePath));

        printCurrentDirectory();

    } catch {
        console.log('Error in decompressing file');
    }
}

export const runZipOperation = async (operationType, args) => {
    try {
        switch (operationType) {
            case 'compress': 
                compressFile(args);
                break;
            case 'decompress': 
                decompressFile(args);
                break;
            default:
                console.log('Invalid input in zip operations');
        }  
    } catch (e) {
        console.log('Error in zip operations');
    }
}