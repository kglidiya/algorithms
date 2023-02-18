export const randomArr = (min: number, max: number) => {
    const arr: number[] = []
    let minLen = min;
    let maxLen = Math.floor(Math.random() * (max - minLen + 1)) + minLen
    for(let i = 0; i < maxLen; i++) {
     arr.push( Math.floor(Math.random() * 100) + 1)
    }
    return arr
}