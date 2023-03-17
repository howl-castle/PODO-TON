import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { InitialContract } from '../wrappers/InitialContract';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('InitialContract', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('InitialContract');
    });

    let blockchain: Blockchain;
    let initialContract: SandboxContract<InitialContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        initialContract = blockchain.openContract(
            InitialContract.createFromConfig(
                {
                    id: 0,
                    counter: 0,
                },
                code
            )
        );

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await initialContract.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: initialContract.address,
            deploy: true,
        });
    });

    it('should deploy', async () => {
        const blockchain = await Blockchain.create();

        const initialContract = blockchain.openContract(
            await InitialContract.createFromConfig(
                {
                    id: 0,
                    counter: 0,
                },
                code
            )
        );
        
        const deployer = await blockchain.treasury('deployer');
        const deployResult = await initialContract.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: initialContract.address,
            deploy: true,
        });
    });


    it('should increase counter', async () => {
        const increaseTimes = 3;
        for (let i = 0; i < increaseTimes; i++) {
            console.log(`increase ${i + 1}/${increaseTimes}`);

            const increaser = await blockchain.treasury('increaser' + i);

            const counterBefore = await initialContract.getCounter();

            console.log('counter before increasing', counterBefore);

            const increaseBy = Math.floor(Math.random() * 100);

            console.log('increasing by', increaseBy);

            const increaseResult = await initialContract.sendIncrease(increaser.getSender(), {
                increaseBy,
                value: toNano('0.05'),
            });

            expect(increaseResult.transactions).toHaveTransaction({
                from: increaser.address,
                to: initialContract.address,
                success: true,
            });

            const counterAfter = await initialContract.getCounter();

            console.log('counter after increasing', counterAfter);

            expect(counterAfter).toBe(counterBefore + increaseBy);
        }
    });
});
