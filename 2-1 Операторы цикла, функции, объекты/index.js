function prime(countNumber) {
    const arrayNumber = [2];
    let start = 1;

    if (+countNumber === 1) {
        return arrayNumber;
    }
    
    while (+countNumber !== arrayNumber.length) {
        start = start + 2;

        for (let step = 1, count = 0; step <= start; step += 2) {
            if (start % step === 0) {
                count++;
            }
            
            if (count > 2) {
                break;
            }

            if (count === 2 && step === start) {
                arrayNumber.push(start);
            }
        }
    }

    return arrayNumber
}

console.log(prime(process.argv[2]));