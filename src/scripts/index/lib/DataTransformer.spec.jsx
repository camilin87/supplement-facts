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

test("Reads the non dailyValue Ingredients", () => {
    var vm = new DataTransformer().generateLabelData({
        nonDailyValueIngredients: [
            {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg"},
            {name: "Chlorine", quantity: 140, unit: "mg"},
            {name: "Sodium", quantity: 11, unit: "mg"}
        ]
    })

    expect(vm.disclaimers.displayDailyValueNotEstablished).toBe(true)
    expect(vm.nonDailyValueIngredients).toEqual([
        {name: "Chlorine", source: "", quantity: 140, unit: "mg"},
        {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg"},
        {name: "Sodium", source: "", quantity: 11, unit: "mg"}
    ])
})

test("Reads the dailyValue Ingredients for adults", () => {
    var dailyValueIngredientsDataServiceMock = {
        all: () => {
            return [
                {name: "Vitamin A", unit: "IU", values: [300, 0, 0, 0]},
                {name: "Vitamin C", unit: "mg", values: [200, 0, 0, 0]},
                {name: "Vitamin D", unit: "IU", values: [100, 0, 0, 0]}
            ]
        }
    }

    var vm = new DataTransformer(dailyValueIngredientsDataServiceMock).generateLabelData({
        productType: "Adults",
        dailyValueIngredients: [
            {name: "Vitamin A", source: "AAAA", quantity: 300},
            {name: "Vitamin C", source: "BBBB", quantity: 200}
        ]
    })

    expect(vm.dailyValueIngredients).toEqual([
        {name: "Vitamin A", source: "AAAA", quantity: 300, unit: "IU", percentage: "100%"},
        {name: "Vitamin C", source: "BBBB", quantity: 200, unit: "mg", percentage: "100%"},
    ])
})

test("Reads the dailyValue Ingredients for infants", () => {
    var dailyValueIngredientsDataServiceMock = {
        all: () => {
            return [
                {name: "Vitamin A", unit: "IU", values: [0, 300, 0, 0]}
            ]
        }
    }

    var vm = new DataTransformer(dailyValueIngredientsDataServiceMock).generateLabelData({
        productType: "Infants",
        dailyValueIngredients: [
            {name: "Vitamin A", source: "AAAA", quantity: 300}
        ]
    })

    expect(vm.dailyValueIngredients[0].percentage).toEqual("100%")
})

test("Reads the dailyValue Ingredients for toddlers", () => {
    var dailyValueIngredientsDataServiceMock = {
        all: () => {
            return [
                {name: "Vitamin A", unit: "IU", values: [0, 0, 300, 0]}
            ]
        }
    }

    var vm = new DataTransformer(dailyValueIngredientsDataServiceMock).generateLabelData({
        productType: "Toddlers",
        dailyValueIngredients: [
            {name: "Vitamin A", source: "AAAA", quantity: 300}
        ]
    })

    expect(vm.dailyValueIngredients[0].percentage).toEqual("100%")
})

test("Calculates the dailyValue Ingredients percentage for adults", () => {
    var dailyValueIngredientsDataServiceMock = {
        all: () => {
            return [
                {name: "Vitamin C", unit: "mg", values: [200, 0, 0, 0]}
            ]
        }
    }

    var vm = new DataTransformer(dailyValueIngredientsDataServiceMock).generateLabelData({
        productType: "Adults",
        dailyValueIngredients: [
            {name: "Vitamin C", source: "BBBB", quantity: 100}
        ]
    })

    expect(vm.dailyValueIngredients[0].percentage).toEqual("50%")
})

test("Rounds down the dailyValue Ingredients percentage for adults", () => {
    var dailyValueIngredientsDataServiceMock = {
        all: () => {
            return [
                {name: "Vitamin C", unit: "mg", values: [200, 0, 0, 0]}
            ]
        }
    }

    var vm = new DataTransformer(dailyValueIngredientsDataServiceMock).generateLabelData({
        productType: "Adults",
        dailyValueIngredients: [
            {name: "Vitamin C", source: "BBBB", quantity: 133}
        ]
    })

    expect(vm.dailyValueIngredients[0].percentage).toEqual("66%")
})

test("Returns less than 1 percent when needed", () => {
    var dailyValueIngredientsDataServiceMock = {
        all: () => {
            return [
                {name: "Vitamin C", unit: "mg", values: [200, 0, 0, 0]}
            ]
        }
    }

    var vm = new DataTransformer(dailyValueIngredientsDataServiceMock).generateLabelData({
        productType: "Adults",
        dailyValueIngredients: [
            {name: "Vitamin C", source: "BBBB", quantity: 1}
        ]
    })

    expect(vm.dailyValueIngredients[0].percentage).toEqual("< 1%")
})
