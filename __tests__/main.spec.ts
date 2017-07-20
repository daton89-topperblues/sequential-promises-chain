
import SequentialPromisesChain from "../src/main";

describe('Async', () => {

    test('success', async () => {

        const spc = new SequentialPromisesChain();

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

describe('Async with iteratee', () => {

    test('success', async () => {

        const spc = new SequentialPromisesChain();

        const users = [{ name: 'Jonathan' }, { name: 'Toni' }, { name: 'Nicola' }]

        const predicate = (user, index) => {

            return new Promise((resolve, reject) => {

                user.id = index

                setTimeout(() => {
                    resolve(user)
                }, 100)

            })
        }

        const iteratee = (user) => {
            return user
        }

        const final = await spc.resolve(users, predicate, iteratee)

        expect(final.length).toBe(3)
        expect(final[0].name).toBe(users[0].name)
        expect(final[0].id).toBe(0)
        expect(final[1].name).toBe(users[1].name)
        expect(final[1].id).toBe(1)
        expect(final[2].name).toBe(users[2].name)
        expect(final[2].id).toBe(2)

    })

    test('fail', async () => {

        const spc = new SequentialPromisesChain();

        const users = [{ name: 'Jonathan' }, { name: 'Toni' }, { name: 'Nicola' }]

        const predicate = (user, index) => {

            return new Promise((resolve, reject) => {

                user.id = index

                setTimeout(() => {
                    if (index === 1) {
                        const error = new Error('Fake error')
                        reject({ index, error })
                    } else {
                        resolve(user)
                    }
                }, 100)

            })
        }

        const iteratee = (user) => {
            return user
        }

        try {

            const final = await spc.resolve(users, predicate, iteratee)

        } catch (error) {

            expect(error.index).toBe(1)
            expect(error.error.message).toBe('Fake error')

        }

    })

    test('fail and force continue', async () => {

        const spc = new SequentialPromisesChain({ force: true });

        const users = [{ name: 'Jonathan' }, { name: 'Toni' }, { name: 'Nicola' }]

        const predicate = (user, index) => {

            return new Promise((resolve, reject) => {

                user.id = index

                setTimeout(() => {
                    if (index === 1) {
                        const error = new Error('Fake error')
                        reject({ index, error })
                    } else {
                        resolve(user)
                    }
                }, 100)

            })
        }

        const iteratee = (user) => {
            return user
        }

        try {

            const final = await spc.resolve(users, predicate, iteratee)

            expect(final.success.length).toBe(2)
            expect(final.fail.length).toBe(1)

        } catch (error) {

            expect(error).toBeUndefined()

        }

    })
})
