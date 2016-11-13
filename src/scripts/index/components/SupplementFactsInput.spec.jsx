import React from "react"
import {shallow} from "enzyme"
import SupplementFactsInput from "./SupplementFactsInput.jsx"

describe("SupplementFactsInput", () => {
    var seededProductTypes = null
    var seededServingSizeInfoTypes = null

    const presetsDataServiceMock = { 
        readProductTypes: () => seededProductTypes,
        readServingSizeInfoTypes: () => seededServingSizeInfoTypes
    }

    var latestBroadcastedState = null
    var onChangeHandler = change => {
        latestBroadcastedState = change
    }

    beforeEach(() => {
        latestBroadcastedState = null

        seededProductTypes = {
            adults: "Adults",
            infants: "Infants",
            toddlers: "Toddlers",
            pregnant: "Pregnant"
        }

        seededServingSizeInfoTypes = []
    })

    describe("", () => {
        var component = null

        beforeEach(() => {
            component = shallow(
                <SupplementFactsInput PresetsDataService={presetsDataServiceMock} onChange={onChangeHandler}/>
            )
        })

        test("default state", () => {
            expect(component.state()).toEqual({
                productType: "Adults",
                percentOfDailyValueAdditionalSymbol: "",
                servingSizeInfoValue: 0,
                servingSizeInfoType: "",
                servingSizeInfoAdditionalComments: "",
                servingSizeInfoServingsPerContainer: 1,
                otherIngredients: [],
                allergens: [],
                businessInfoDistributedByLabel: "",
                businessInfoBusinessName: "",
                businessInfoStreetAddressLine1: "",
                businessInfoStreetAddressLine2: "",
                businessInfoCity: "",
                businessInfoState: "",
                businessInfoZipCode: "",
                businessInfoPhone: "",
                dailyValueIngredients: [],
                nonDailyValueIngredients: []
            })
        })

        test("displays the percentOfDailyValueAdditionalSymbol", () => {
            component.setState({percentOfDailyValueAdditionalSymbol: "^"})

            expect(component.find("input[name='percentOfDailyValueAdditionalSymbol']").props().value).toBe("^")
        })

        test("updates the percentOfDailyValueAdditionalSymbol", () => {
            component.find("input[name='percentOfDailyValueAdditionalSymbol']").simulate("change", {target: {value: "newValue"}})

            expect(latestBroadcastedState.percentOfDailyValueAdditionalSymbol).toBe("newValue")
        })

        test("displays the serving size info value", () => {
            component.setState({ servingSizeInfoValue: 10 })

            expect(component.find("input[name='servingSizeInfoValue']").props().value).toBe(10)
        })

        test("updates the serving size info value", () => {
            component.find("input[name='servingSizeInfoValue']").simulate("change", {target: {value: 11}})

            expect(latestBroadcastedState.servingSizeInfoValue).toBe(11)
        })
    })

    describe("Product Type Selection", () => {
        var component = null
        const findQuery = "Select[name='productType']"

        beforeEach(() => {
            seededProductTypes = {
                toddlers: "Toddlers",
                pregnant: "Pregnant"
            }

            component = shallow(
                <SupplementFactsInput PresetsDataService={presetsDataServiceMock} onChange={onChangeHandler}/>
            )
        })

        test("The product type is not clearable", () => {
            expect(component.find(findQuery).props().clearable).toBe(false)
        })

        test("Displays one option per product type", () => {
            expect(component.find(findQuery).props().options).toEqual([
                {value: "Toddlers", label: "Toddlers"},
                {value: "Pregnant", label: "Pregnant"}
            ])
        })

        test("Product type changes are broadcasted", () => {
            component.find(findQuery).simulate("change", {value: "Pregnant"})

            expect(latestBroadcastedState.productType).toBe("Pregnant")
        })

        test("Selects the first product type", () => {
            expect(component.state().productType).toBe("Toddlers")
            expect(component.find(findQuery).props().value).toBe("Toddlers")
        })
    })

    describe("Serving Size Selection", () => {
        var component = null
        const findQuery = "Select[name='servingSizeInfoType']"

        beforeEach(() => {
            seededServingSizeInfoTypes = [
                "Capsule",
                "Packet"
            ]

            component = shallow(
                <SupplementFactsInput PresetsDataService={presetsDataServiceMock} onChange={onChangeHandler}/>
            )
        })

        test("The serving size info type is not clearable", () => {
            expect(component.find(findQuery).props().clearable).toBe(false)
        })

        test("Displays one option per serving size info type", () => {
            expect(component.find(findQuery).props().options).toEqual([
                {value: "Capsule", label: "Capsule"},
                {value: "Packet", label: "Packet"}
            ])
        })

        test("Serving Size Info type changes are broadcasted", () => {
            component.find(findQuery).simulate("change", {value: "Packet"})

            expect(latestBroadcastedState.servingSizeInfoType).toBe("Packet")
            expect(component.find(findQuery).props().value).toBe("Packet")
        })
    })
})
