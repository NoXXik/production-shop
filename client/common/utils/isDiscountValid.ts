
export const isDiscountValid = (start: string, expiration: string) => {
    try {
        const startDate = Date.parse(start)
        const expirationDate = Date.parse(expiration)
        if(startDate <= Date.now() && Date.now() <= expirationDate) {
            return true
        } else {
            return false
        }
    } catch (e) {
        return false
    }
}

export const priceWithDiscount = (price: number, discount: number) => {
    return (price*((100-discount)/100)).toFixed(0)
}

export const  discountValue = (price: number, discount: number) => {
    return (price*((discount)/100)).toFixed(0)
}


// const start = "2023-04-17T20:31:40.000Z"
// const expiration = "2023-04-30T20:31:40.000Z"
// const startDate = Date.parse(start)
// const expirationDate = Date.parse(expiration)
// if(startDate < Date.now() && Date.now() < expirationDate) {
//     console.log(true)
// } else {
//     console.log(false)
// }

// expirationDate
//     :
//     "2023-04-30T20:31:40.000Z"
// startDate
//     :
//     "2023-04-17T20:31:40.000Z"
