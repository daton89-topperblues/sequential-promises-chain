
import SequentialPromisesChain from "../src/main";

const spc = new SequentialPromisesChain();

describe('Ordered promises resolve ', () => {

    test('resolve', async () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        const fn = (element, index, fnArray) => {
            return new Promise((resolve, reject) => {
                const randInterval = (Math.floor(Math.random() * 9) + 1) * 10
                setTimeout(() => {
                    return resolve(element)
                }, randInterval)
            })
        }

        const res = await spc.resolve(array, fn);

        expect(array).toEqual(res);
    });

})
