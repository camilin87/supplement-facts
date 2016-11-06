import React from "react"
import {shallow} from "enzyme"
import DataTransformer from "./DataTransformer.jsx"

test("Returns empty object by default", () => {
    var vm = new DataTransformer().generateLabelData({})

    expect(vm).toEqual({
        servingSizeInfo: {},
        disclaimers: {},
        otherIngredients: {
            otherIngredients: "",
            allergens: ""
        },
        businessInfo: {},
        dailyValueIngredients: [],
        nonDailyValueIngredients: []
    })
})

test("Returns the otherIngredients", () => {
    var vm = new DataTransformer().generateLabelData({
        otherIngredients: [
            {name: "hg", quantity: 10},
            {name: "U", quantity: 1001},
            {name: "pb", quantity: 1000},
            {name: "pb1", quantity: 1000}
        ]
    })

    expect(vm.otherIngredients.otherIngredients).toEqual("U, pb, pb1, hg")
})

test("Returns the allergens", () => {
    var vm = new DataTransformer().generateLabelData({
        allergens: [
            "penicillin",
            "nuts",
            "soy"
        ]
    })

    expect(vm.otherIngredients.allergens).toEqual("penicillin, nuts, soy")
})

