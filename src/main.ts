/** Class representing an SequentialPromisesChain. */
export default class SequentialPromisesChain {
    /**
     * @param  {boolean} privateforce?
     */
    constructor(private force?: boolean) {

    }

    /**
     * resolve
     * @param  {any[]} array - Array of elements passed to the function
     * @param  {any} predicate - Function that return a promise.
     *                     The function get as parameters:
     *                     element -  array element in order
     *                     index - the index of the current element
     * @param  {any} callback?
     * @returns Array of ordered promises - The resolve start when this function is called
     */
    public resolve(array: any[], predicate: any, iteratee?: any): any {

        if (iteratee === undefined) {
            iteratee = (res) => res
        }

        const final: any[] = []
        const fail: any[] = []

        return array.reduce((promise: any, element: any, index: number, array: any[]) => {

            return promise.then((i) => {

                if (this.force) {

                    return predicate(element, index)
                        .then(iteratee)
                        .then((result) => {

                            final.push(result)

                            return { fail, final }
                        })
                        .catch((err) => {
                            fail.push(err)

                            return { fail, final }
                        })

                } else {

                    return predicate(element, index)
                        .then(iteratee)
                        .then((result) => {

                            final.push(result)

                            return final
                        })

                }

            })

        }, Promise.resolve())

    }

}
