const isDiscountValid = (start, expiration) => {
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

const priceWithDiscount = (price, discount) => {
    return Number((price*((100-discount)/100)).toFixed(0))
}

const  discountValue = (price, discount) => {
    return Number((price*((discount)/100)).toFixed(0))
}

module.exports = {
    isDiscountValid,
    discountValue,
    priceWithDiscount,
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
