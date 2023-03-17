import { toNano } from 'ton-core';
import { InitialContract } from '../wrappers/InitialContract';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const initialContract = InitialContract.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('InitialContract')
    );

    await provider.deploy(initialContract, toNano('0.05'));

    const openedContract = provider.open(initialContract);

    /* await provider.waitForDeploy(initialContract, toNano('0.05')); */

    console.log('ID', await openedContract.getID());
}

/*
export async function run(provider: NetworkProvider) {
    const initialContract = provider.open(
        InitialContract.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('InitialContract')
        )
    );

    await initialContract.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(initialContract.address);

    console.log('ID', await initialContract.getID());
}

*/