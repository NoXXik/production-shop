const url = require('url')



const receipt = {
    sno: "osn",
    items: [
        {
            name: "Название товара 1",
            quantity: 1,
            sum: 100,
            payment_method: "full_payment",
            payment_object: "commodity",
            tax: "vat20"
        },
        {
            name: "Название товара 2",
            quantity: 3,
            sum: 450,
            cost: 150,
            payment_method: "full_prepayment",
            payment_object: "commodity",
            tax: "vat20"
        }
    ]
}
let values = []
const str = JSON.stringify(receipt)

console.log(url.parse(str).path)
function encode (receipt) {
    if (receipt) {
        for (let key in receipt) {
            if(typeof receipt[key] === 'string') {
                values[key] = receipt[key]
            } else if (typeof receipt[key] === 'object' && receipt[key].length) {
                // console.log(receipt[key], key)
                for (let i = 0; i < receipt[key].length; i++) {
                    // console.log(receipt[key][i])
                    for (let _key in receipt[key][i]) {
                        // console.log(receipt[key][i][_key])
                    }
                }
            }
        }
    }
}

encode(receipt)

console.log(str, typeof str)
