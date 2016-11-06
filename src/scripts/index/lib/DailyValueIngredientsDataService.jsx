export default class DailyValueIngredientsService {
    all () {
        //{name: "name", unit: "unit", values: [adults, infants, toddlers, pregnant]}
        return [
            {name: "Vitamin A", unit: "IU", values: [5000, 1500, 2500, 8000]},
            {name: "Vitamin C", unit: "mg", values: [60, 35, 40, 60]},
            {name: "Vitamin D", unit: "IU", values: [400, 400, 400, 400]},
            {name: "Vitamin E", unit: "IU", values: [30, 5, 10, 30]},
            {name: "Vitamin K", unit: "mc", values: [80, null, null, null]},
            {name: "Thiamin", unit: "mg", values: [1.5, 0.5, 0.7, 1.7]},
            {name: "Riboflavin", unit: "mg", values: [1.7, 0.6, 0.8, 2.0]},
            {name: "Niacin", unit: "mg", values: [20, 8, 9, 20]},
            {name: "Vitamin B6", unit: "mg", values: [2.0, 0.4, 0.7, 2.5]},
            {name: "Folate", unit: "mc", values: [400, 100, 200, 800]},
            {name: "Vitamin B12", unit: "mc", values: [6.0, 2, 3, 8]},
            {name: "Biotin", unit: "mc", values: [300, 50, 150, 300]},
            {name: "Pantothenic Acid", unit: "mg", values: [10, 3, 5, 10]},
            {name: "Calcium", unit: "mg", values: [1000, 600, 800, 1300]},
            {name: "Iron", unit: "mg", values: [18, 15, 10, 18]},
            {name: "Phosphorus", unit: "mg", values: [1000, 500, 800, 1300]},
            {name: "Iodine", unit: "mc", values: [150, 45, 70, 150]},
            {name: "Magnesium", unit: "mg", values: [400, 70, 200, 450]},
            {name: "Zinc", unit: "mg", values: [15, 5, 8, 15]},
            {name: "Selenium", unit: "mc", values: [70, null, null, null]},
            {name: "Copper", unit: "mg", values: [2.0, 0.6, 1.0, 2.0]},
            {name: "Manganese", unit: "mg", values: [2.0, null, null, null]},
            {name: "Chromium", unit: "mc", values: [120, null, null, null]},
            {name: "Molybdenum", unit: "mc", values: [75, null, null, null]},
            {name: "Chloride", unit: "mg", values: [3400, null, null, null]},
            {name: "Sodium", unit: "mg", values: [2400, null, null, null]},
            {name: "Potassium", unit: "mg", values: [3500, null, null, null]}
        ]
    }
}