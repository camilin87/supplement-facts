import React from "react"
import {shallow} from "enzyme"
import DataTransformer from "./DataTransformer.jsx"

test("Returns empty object by default", () => {
    var vm = new DataTransformer().generateLabelData({})

    expect(vm).toEqual({
        servingSizeInfo: {
            type: "",
            additionalComments: ""
        },
        percentOfDailyValueAdditionalSymbol: "",
        disclaimers: {
            percentOfDailyValueAdditionalSymbol: "",
            displayDailyValueNotEstablished: false,
            displayChildrenDisclaimer: false,
            displayPregnantWomenDisclaimer: false
        },
        otherIngredients: {
            otherIngredients: "",
            allergens: ""
        },
        businessInfo: {
            distributedByLabel: "",
            businessName: "",
            streetAddressLine1: "",
            streetAddressLine2: "",
            city: "",
            state: "",
            zipCode: "",
            phone: ""
        },
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

test("returns the percent of daily value additional symbol", () => {
    var vm = new DataTransformer().generateLabelData({
        percentOfDailyValueAdditionalSymbol: "^"
    })

    expect(vm.percentOfDailyValueAdditionalSymbol).toEqual("^")
    expect(vm.disclaimers.percentOfDailyValueAdditionalSymbol).toBe("^")
})

test("Reads the Serving Size Info", () => {
    var vm = new DataTransformer().generateLabelData({
        servingSizeInfo: {
            value: 21,
            type: "bottle",
            additionalComments: "(4g) 1 tbsp",
            servingsPerContainer: 5
        }
    })

    expect(vm.servingSizeInfo).toEqual({
        value: 21,
        type: "bottle",
        additionalComments: "(4g) 1 tbsp",
        servingsPerContainer: 5
    })
})

test("Reads the Business Info", () => {
    var vm = new DataTransformer().generateLabelData({
        businessInfo: {
            distributedByLabel: "Distributed by",
            businessName: "Apple",
            streetAddressLine1: "One infinite loop",
            streetAddressLine2: " --- ",
            city: "cupertino",
            state: "CA",
            zipCode: "55555",
            phone: "1-800-my-apple"
        }
    })

    expect(vm.businessInfo).toEqual({
        distributedByLabel: "Distributed by",
        businessName: "Apple",
        streetAddressLine1: "One infinite loop",
        streetAddressLine2: " --- ",
        city: "cupertino",
        state: "CA",
        zipCode: "55555",
        phone: "1-800-my-apple"
    })
})