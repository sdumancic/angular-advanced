/**
 * Tests whether two values are deeply equal using same-value equality.
 *
 * Two values are considered deeply equal iff 1) they are the same value, or
 * 2) they are both non-callable objects whose own, enumerable, string-keyed
 * properties are deeply equal.
 *
 * Caution: This function does not fully support circular references. Use this
 * function only if you are sure that at least one of the arguments has no
 * circular references.
 */
export function deepEqual(x: any, y: any): boolean {
  // If either x or y is not an object, then they are deeply equal iff they
  // are the same value. For our purposes, objects exclude functions,
  // primitive values, null, and undefined.
  if (
    typeof x !== 'object' ||
    x === null ||
    typeof y !== 'object' ||
    y === null
  ) {
    // We use Object.is() to check for same-value equality. To check for
    // strict equality, we would use x === y instead.
    return Object.is(x, y);
  }

  // Shortcut, in case x and y are the same object. Every object is
  // deeply equal to itself.
  if (x === y) return true;

  // Obtain the own, enumerable, string-keyed properties of x. We ignore
  // properties defined along x's prototype chain, non-enumerable properties,
  // and properties whose keys are symbols.
  const keys = Object.keys(x);
  // If x and y have a different number of properties, then they are not
  // deeply equal.
  if (Object.keys(y).length !== keys.length) return false;

  // For each own, enumerable, string property key of x:
  for (const key of keys) {
    // If key is not also an own enumerable property of y, or if x[key] and
    // y[key] are not themselves deeply equal, then x and y are not deeply
    // equal. Note that we don't just call y.propertyIsEnumerable(),
    // because y might not have such a method (for example, if it was
    // created using Object.create(null)), or it might not be the same
    // method that exists on Object.prototype.
    if (
      !Object.prototype.propertyIsEnumerable.call(y, key) ||
      !deepEqual(x[key], y[key])
    ) {
      return false;
    }
  }

  // x and y have the same properties, and all of those properties are deeply
  // equal, so x and y are deeply equal.
  return true;
}

export function deepEqualArray(firstArr: any[], secondArr: any[]): boolean {
  if (!Array.isArray(firstArr) || !Array.isArray(secondArr)) {
    return false;
  }
  if (firstArr.length !== secondArr.length) {
    return false;
  }
  for (let i = 0; i < firstArr.length; i++) {
    let rowResult = deepEqual(firstArr[i], secondArr[i]);
    if (rowResult === false) {
      return false;
    }
  }
  return true;
}
