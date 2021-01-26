function calculate(num, promotion) {
    if (promotion) {
        let values = 0
        if (promotion.promotion.type) {
            values = num - promotion.promotion.value
        } else {
            let val = Math.ceil(num * promotion.promotion.value / 100)
            if (promotion.promotion.max_value && val > promotion.promotion.max_value) {
                values = num - promotion.promotion.max_value
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
export default calculate;