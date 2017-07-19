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
const fn = (element, index, fnArray) => {
    return new Promise((resolve, reject) => {
        ...
            return resolve(element)
        or
            return reject(error)
        ...
    })
}
//Execute the function on each array element sa a sequential chain

//Await the result
try{
    const res = await spc.resolve(array, fn);
}catch(err){
    ...
}
//Or not
spc.resolve(array, fn)
.then(...)
.catch(...)
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
