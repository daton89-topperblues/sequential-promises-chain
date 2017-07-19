/** Class representing an SequentialPromisesChain. */
export default class SequentialPromisesChain {

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
    public resolve(array, fn) {
        const final = []
        return array.reduce((promise, element, index, array) => {
            return promise.then((result) => {
                return fn(element, index, array).then((res) => {
                    final.push(res)
                    return final
                })
            })
        }, Promise.resolve())
    }

}
