import { printCurrentDirectory } from "../utils/utils.js";
import { EOL, cpus, homedir, userInfo, arch } from 'node:os';

const getEOL = async () => {
    try {
        console.log(`Your EOL: ${JSON.stringify(EOL)}`);
        printCurrentDirectory();

    } catch {
        console.log('Error in getting EOL');
    }
}

const getHostMachineCPU = async () => {
    try {
        const cpusInfo = cpus();
        const coreNumber = cpusInfo.length;

        const cpusInfoFormed = cpusInfo.map((cpu) => ({
            model: cpu.model,
            speed: `${(cpu.speed / 1000).toFixed(3)} GHz`
        }));

        console.log(`Amount of CPUS: ${coreNumber}`);
        console.log('Your CPUS: ');
        cpusInfoFormed.forEach( (element) => {
            console.log(`Model: ${element.model}`);
            console.log(`Speed: ${element.speed} \n`);
        })
        printCurrentDirectory();

    } catch {
        console.log('Error in getting CPUS information');
    }
}

const getHomeDirrectory = async () => {
    try {
        console.log(`Your home directory: ${homedir()}`);
        printCurrentDirectory();

    } catch {
        console.log('Error in getting home dirrectory');
    }
}

const getUserName = async () => {
    try {
        const currentUserInfo = userInfo();
        console.log(`Your system user name: ${currentUserInfo['username']}`);

        printCurrentDirectory();

    } catch {
        console.log('Error in getting system user name');
    }
}

const getCpuArchitecture = async () => {
    try {
        const architectureInfo = arch();
        console.log(`Your CPU architecture: ${architectureInfo}`);

        printCurrentDirectory();

    } catch {
        console.log('Error in getting CPU architecture');
    }
}

export const runOsInfoOperation = async (args) => {
    const [flag] = args || [];
    // try {
          
    // } catch (e) {
    //     console.log('Error in OS info operation')
    // }

    switch (flag) {
        case '--EOL': 
            getEOL();
            break;
        case '--cpus': 
            getHostMachineCPU();
            break;
        case '--homedir': 
            getHomeDirrectory();
            break;
        case '--username': 
            getUserName();
            break;
        case '--architecture': 
            getCpuArchitecture();
            break;
        default:
            console.log('Invalid input in OS info operation');
    }

}

