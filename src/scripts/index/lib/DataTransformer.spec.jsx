import React from "react"
import {shallow} from "enzyme"
import DataTransformer from "./DataTransformer.jsx"


describe("DataTransformer", () => {
    var dataTransformer = null
    var seededDailyValueIngredients = null

    beforeEach(() => {
        seededDailyValueIngredients = []

        var dailyValueIngredientsDataServiceMock = {
            all: () => seededDailyValueIngredients
        }

        var presetsDataServiceMock = {
            readProductTypes: () => { 
                return {
                    adults: "Adults",
                    infants: "Infants",
                    toddlers: "Toddlers",
                    pregnant: "Pregnant"
                }
            }
        }

        dataTransformer = new DataTransformer(
            dailyValueIngredientsDataServiceMock,
            presetsDataServiceMock
        )
    })

    test("Returns empty object by default", () => {
        var vm = dataTransformer.generateLabelData({})

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
        var vm = dataTransformer.generateLabelData({
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
        var vm = dataTransformer.generateLabelData({
            allergens: [
                {id: 34, text: "penicillin"},
                {id: 31, text: "nuts"},
                {id: 12, text: "soy"}
            ]
        })

        expect(vm.otherIngredients.allergens).toEqual("penicillin, nuts, soy")
    })

    test("returns the percent of daily value additional symbol", () => {
        var vm = dataTransformer.generateLabelData({
            percentOfDailyValueAdditionalSymbol: "^"
        })

        expect(vm.percentOfDailyValueAdditionalSymbol).toEqual("^")
        expect(vm.disclaimers.percentOfDailyValueAdditionalSymbol).toBe("^")
    })

    test("Reads the Serving Size Info", () => {
        var vm = dataTransformer.generateLabelData({
            servingSizeInfoValue: 1,
            servingSizeInfoType: "bottle",
            servingSizeInfoAdditionalComments: "(4g) 1 tbsp",
            servingSizeInfoServingsPerContainer: 5
        })

        expect(vm.servingSizeInfo).toEqual({
            value: 1,
            type: "bottle",
            additionalComments: "(4g) 1 tbsp",
            servingsPerContainer: 5
        })
    })

    test("Pluralizes the Serving Size type", () => {
        var vm = dataTransformer.generateLabelData({
            servingSizeInfoValue: 2,
            servingSizeInfoType: "bottle"
        })

        expect(vm.servingSizeInfo.type).toEqual("bottles")
    })

    test("Reads the Business Info", () => {
        var vm = dataTransformer.generateLabelData({
            businessInfoDistributedByLabel: "Distributed by",
            businessInfoBusinessName: "Apple",
            businessInfoStreetAddressLine1: "One infinite loop",
            businessInfoStreetAddressLine2: " --- ",
            businessInfoCity: "cupertino",
            businessInfoState: "CA",
            businessInfoZipCode: "55555",
            businessInfoPhone: "1-800-my-apple"
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
        var vm = dataTransformer.generateLabelData({
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

    test("Displays the children disclaimer for infants", () => {
        var vm = dataTransformer.generateLabelData({
            productType: "Infants",
            nonDailyValueIngredients: [
                {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg"}
            ]
        })

        expect(vm.disclaimers.displayChildrenDisclaimer).toBe(true)
    })

    test("Displays the children disclaimer for toddlers", () => {
        var vm = dataTransformer.generateLabelData({
            productType: "Toddlers",
            nonDailyValueIngredients: [
                {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg"}
            ]
        })

        expect(vm.disclaimers.displayChildrenDisclaimer).toBe(true)
    })

    test("Displays the pregnant women disclaimer for pregnant women", () => {
        var vm = dataTransformer.generateLabelData({
            productType: "Pregnant",
            nonDailyValueIngredients: [
                {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg"}
            ]
        })

        expect(vm.disclaimers.displayPregnantWomenDisclaimer).toBe(true)
    })

    test("Reads the dailyValue Ingredients for adults", () => {
        seededDailyValueIngredients = [
            {name: "Vitamin A", unit: "IU", values: [300, 0, 0, 0]},
            {name: "Vitamin C", unit: "mg", values: [200, 0, 0, 0]},
            {name: "Vitamin D", unit: "IU", values: [100, 0, 0, 0]}
        ]

        var vm = dataTransformer.generateLabelData({
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

    test("Reads the dailyValue Ingredients sorted by their predefined order", () => {
        seededDailyValueIngredients = [
            {name: "Vitamin A", unit: "IU", values: [100, 0, 0, 0]},
            {name: "Vitamin C", unit: "IU", values: [100, 0, 0, 0]},
            {name: "Vitamin D", unit: "IU", values: [100, 0, 0, 0]}
        ]

        var vm = dataTransformer.generateLabelData({
            productType: "Adults",
            dailyValueIngredients: [
                {name: "Vitamin D", quantity: 100},
                {name: "Vitamin A", quantity: 100},
                {name: "Vitamin C", quantity: 100}
            ]
        })

        expect(vm.dailyValueIngredients.map(i => i.name)).toEqual([
            "Vitamin A",
            "Vitamin C",
            "Vitamin D"
        ])
    })

    test("Reads the dailyValue Ingredients for infants", () => {
        seededDailyValueIngredients = [
            {name: "Vitamin A", unit: "IU", values: [0, 300, 0, 0]}
        ]

        var vm = dataTransformer.generateLabelData({
            productType: "Infants",
            dailyValueIngredients: [
                {name: "Vitamin A", source: "AAAA", quantity: 300}
            ]
        })

        expect(vm.dailyValueIngredients[0].percentage).toEqual("100%")
    })

    test("Reads the dailyValue Ingredients for toddlers", () => {
        seededDailyValueIngredients = [
            {name: "Vitamin A", unit: "IU", values: [0, 0, 300, 0]}
        ]

        var vm = dataTransformer.generateLabelData({
            productType: "Toddlers",
            dailyValueIngredients: [
                {name: "Vitamin A", source: "AAAA", quantity: 300}
            ]
        })

        expect(vm.dailyValueIngredients[0].percentage).toEqual("100%")
    })

    test("Reads the dailyValue Ingredients for pregnant women", () => {
        seededDailyValueIngredients = [
            {name: "Vitamin A", unit: "IU", values: [0, 0, 0, 300]}
        ]

        var vm = dataTransformer.generateLabelData({
            productType: "Pregnant",
            dailyValueIngredients: [
                {name: "Vitamin A", source: "AAAA", quantity: 300}
            ]
        })

        expect(vm.dailyValueIngredients[0].percentage).toEqual("100%")
    })

    test("Calculates the dailyValue Ingredients percentage for adults", () => {
        seededDailyValueIngredients = [
            {name: "Vitamin C", unit: "mg", values: [200, 0, 0, 0]}
        ]

        var vm = dataTransformer.generateLabelData({
            productType: "Adults",
            dailyValueIngredients: [
                {name: "Vitamin C", source: "BBBB", quantity: 100}
            ]
        })

        expect(vm.dailyValueIngredients[0].percentage).toEqual("50%")
    })

    test("Rounds down the dailyValue Ingredients percentage for adults", () => {
        seededDailyValueIngredients = [
            {name: "Vitamin C", unit: "mg", values: [200, 0, 0, 0]}
        ]

        var vm = dataTransformer.generateLabelData({
            productType: "Adults",
            dailyValueIngredients: [
                {name: "Vitamin C", source: "BBBB", quantity: 133}
            ]
        })

        expect(vm.dailyValueIngredients[0].percentage).toEqual("66%")
    })

    test("Returns less than 1 percent when needed", () => {
        seededDailyValueIngredients  = [
            {name: "Vitamin C", unit: "mg", values: [200, 0, 0, 0]}
        ]

        var vm = dataTransformer.generateLabelData({
            productType: "Adults",
            dailyValueIngredients: [
                {name: "Vitamin C", source: "BBBB", quantity: 1}
            ]
        })

        expect(vm.dailyValueIngredients[0].percentage).toEqual("< 1%")
    })
})
