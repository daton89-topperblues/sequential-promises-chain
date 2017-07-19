"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Class representing an SequentialPromisesChain. */
var SequentialPromisesChain = (function () {
    function SequentialPromisesChain() {
    }
    /**
     * Rollback the executed operations if any error occurred.
     * @param   array - Array of elements passed to the function
     * @param   function - Function that return a promise.
     *                     The function get as parameters:
     *                     element -  array element in order
     *                     index - the index of the current element
     *                     array - the array
     * @returns Array of ordered promises - The resolve start when this function is called
     */
    SequentialPromisesChain.prototype.resolve = function (array, fn) {
        var final = [];
        return array.reduce(function (promise, element, index, array) {
            return promise.then(function (result) {
                return fn(element, index, array).then(function (res) {
                    final.push(res);
                    return final;
                });
            });
        }, Promise.resolve());
    };
    return SequentialPromisesChain;
}());
exports.default = SequentialPromisesChain;
//# sourceMappingURL=main.js.map