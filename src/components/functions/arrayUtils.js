export function areArraysEqual(arr1, arr2) {
    // Check if arrays have the same length
    if (arr1.length !== arr2.length) {
        return false;
    }

    const trimmedAndSortedArr1 = arr1.map(value => value.trim()).sort();
    const trimmedAndSortedArr2 = arr2.map(value => value.trim()).sort();

    // Check if each element is equal
    return trimmedAndSortedArr1.every((value, index) => value === trimmedAndSortedArr2[index]);
    
}
