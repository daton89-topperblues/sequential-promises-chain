[![travis](https://travis-ci.org/daton89-topperblues/sequential-promises-chain.svg?branch=master)](https://www.npmjs.com/package/sequential-promises-chain)
[![dm](https://img.shields.io/npm/dm/sequential-promises-chain.svg)](https://www.npmjs.com/package/sequential-promises-chain)
[![version](https://img.shields.io/npm/v/sequential-promises-chain.svg)](https://www.npmjs.com/package/sequential-promises-chain)
[![GitHub stars](https://img.shields.io/github/stars/daton89-topperblues/sequential-promises-chain.svg?style=social&label=Star)](https://www.github.com/daton89-topperblues/sequential-promises-chain)
[![GitHub forks](https://img.shields.io/github/forks/daton89-topperblues/sequential-promises-chain.svg?style=social&label=Fork)](https://github.com/daton89-topperblues/sequential-promises-chain)
<!-- [![sequential-promises-chain](https://raw.githubusercontent.com/daton89-topperblues/sequential-promises-chain/master/docs/img/sequential-promises-chain.png)](https://www.npmjs.com/package/sequential-promises-chain) -->
# Introduction
###### Sequential promises chain
Often you need to resolve a promises chain in order as a sequential chain.

### Getting started
Install module: 
```sh
$ npm i sequential-promises-chain
```

Install and save module in your project: 
```sh
$ npm i -S sequential-promises-chain
```

#### API
Create new instance:
```js
const SequentialPromisesChain = require('sequential-promises-chain')

const spc = new SequentialPromisesChain();
```
Resolve a promises chain:
```js
//Array of elements on wich the function may be make some operations
const array = [...]
//A function that operate on elements and return a promise
const predicate = (element, index) => {
    return new Promise((resolve, reject) => {
        ...
            return resolve(element)
        or
            return reject(error)
        ...
    })
}

try{
    // Execute the function on each array element as a sequential chain
    /**
     * resolve
     * @param  {any[]} array - Array of elements passed to the function
     * @param  {any} predicate - Function that return a promise.
     *                     The function get as parameters:
     *                     element -  array element in order
     *                     index - the index of the current element
     * @param  {any} iteratee? function called for each resolved promise (must return element)
     * @returns Array of ordered promises - The resolve start when this function is called
     */
    const res = await spc.resolve(array, predicate); // return Promise
    // Await the result
}catch(err){
    ...
}

```

You can also specify an iteratee function:

```js
const spc = new SequentialPromisesChain();

const users = [{ name: 'Jonathan' }, { name: 'Toni' }, { name: 'Nicola' }]

const predicate = (user, index) => {

    return new Promise((resolve, reject) => {

        user.id = index

        setTimeout(() => {
            resolve(user)
        }, 1000)

    })
}

const iteratee = (user) => {
    return user
}

const final = await spc.resolve(users, predicate, iteratee)

// expect(final.length).toBe(3)
// expect(final[0].name).toBe(users[0].name)
// expect(final[0].id).toBe(0)
// expect(final[1].name).toBe(users[1].name)
// expect(final[1].id).toBe(1)
// expect(final[2].name).toBe(users[2].name)
// expect(final[2].id).toBe(2)

```

By default the Promises chain will stop if an error occur, but you can specify `force: true` to continue exec of Promises even if one fail:

```js

const spc = new SequentialPromisesChain({force: true});

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
        }, 1000)

    })
}

const iteratee = (user) => {
    return user
}

try {

    const final = await spc.resolve(users, predicate, iteratee)

    // expect(final.success.length).toBe(2)
    // expect(final.fail.length).toBe(1)

} catch (error) {

    // expect(error).toBeUndefined()

}
```

See tests folder for more examples

Feel free to open issues, fork project, and collaborate with us!

### Contribute

Clone repository locally and install dependencies:
```sh
$ git clone https://github.com/daton89-topperblues/sequential-promises-chain
$ cd sequential-promises-chain
$ npm i
```

Fork project and open pull request 

### Contributors 
[@topperblues](https://github.com/topperblues) Nicola Bonavita

[@daton89](https://github.com/daton89) Toni D'Angelo
