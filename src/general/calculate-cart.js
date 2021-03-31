function calculateCart(num, promotion) {
    if (promotion) {
        let values = 0
        if (promotion.type) {
            values = num - promotion.value
        } else {
            let val = Math.ceil(num * promotion.value / 100)
            if (promotion.max_value && val > promotion.max_value) {
                values = num - promotion.max_value
            } else {
                values = num - val
            }
        }
        if (values > 0) {
            return values
        } else {
            return 0
        }
    } else {
        return num
    }
}
export default calculateCart;