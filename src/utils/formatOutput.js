/**
 * A helper function that merges all top-level objects that has the same ID
 * and uses a callback function to add and remove any unwanted properties
 * @param {{}[]} array The array of data
 * @param {string} id The name of the id key
 * @param {(existing: {[key: string]: any}, current: {[key: string]: any}) => {[key: string]: any}} mergerFunction The function called with two arguments to merge two objects
 */
function formatOutput(array, id = "id", mergerFunction) {
  const output = []
  array.forEach(item => {
    const existing = output.filter(existingValues => {
      return existingValues[id] === item[id]
    })[0];

    if (existing) {
      const existingIndex = output.indexOf(existing)
      output[existingIndex] = mergerFunction(existing, item)
    } else {
      const newItem = { ...item }
      output.push(mergerFunction(undefined, newItem))
    }
  })
  return output
}


module.exports = formatOutput