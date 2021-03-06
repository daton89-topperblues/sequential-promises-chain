"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Class representing an SequentialPromisesChain. */
var SequentialPromisesChain = (function () {
    /**
     * @param  {boolean} privateforce?
     */
    function SequentialPromisesChain(options) {
        if (options === void 0) { options = { force: false }; }
        this.options = options;
    }
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
    SequentialPromisesChain.prototype.resolve = function (array, predicate, iteratee) {
        var _this = this;
        if (iteratee === undefined) {
            iteratee = function (res) { return res; };
        }
        var final = [];
        var fail = [];
        return array.reduce(function (promise, element, index, array) {
            return promise.then(function (i) {
                if (_this.options.force) {
                    return predicate(element, index)
                        .then(iteratee)
                        .then(function (result) {
                        final.push(result);
                        return { fail: fail, success: final };
                    })
                        .catch(function (err) {
                        fail.push(err);
                        return { fail: fail, success: final };
                    });
                }
                else {
                    return predicate(element, index)
                        .then(iteratee)
                        .then(function (result) {
                        final.push(result);
                        return final;
                    });
                }
            });
        }, Promise.resolve());
    };
    return SequentialPromisesChain;
}());
exports.default = SequentialPromisesChain;
//# sourceMappingURL=main.js.map