import React from "react"
import {shallow} from "enzyme"
import SupplementFactsInput from "./SupplementFactsInput.jsx"

describe("SupplementFactsInput", () => {
    var seededProductTypes = null
    const productTypesDataServiceMock = { read: () => seededProductTypes }

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
    })

    describe("", () => {
        var component = null

        beforeEach(() => {
            component = shallow(
                <SupplementFactsInput ProductTypesDataService={productTypesDataServiceMock} onChange={onChangeHandler}/>
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
                businessInfo: {
                    distributedByLabel: null,
                    businessName: null,
                    streetAddressLine1: null,
                    streetAddressLine2: null,
                    city: null,
                    state: null,
                    zipCode: null,
                    phone: null
                },
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

        beforeEach(() => {
            seededProductTypes = {
                toddlers: "Toddlers",
                pregnant: "Pregnant"
            }

            component = shallow(
                <SupplementFactsInput ProductTypesDataService={productTypesDataServiceMock} onChange={onChangeHandler}/>
            )
        })

        test("Selects the first product type", () => {
            expect(component.state().productType).toBe("Toddlers")
            expect(component.find("Select[name='productType']").props().value).toBe("Toddlers")
        })

        test("The product type is not clearable", () => {
            expect(component.find("Select[name='productType']").props().clearable).toBe(false)
        })

        test("Displays one option per product type", () => {
            expect(component.find("Select[name='productType']").props().options).toEqual([
                {value: "Toddlers", label: "Toddlers"},
                {value: "Pregnant", label: "Pregnant"}
            ])
        })

        test("Product type changes are broadcasted", () => {
            component.find("Select[name='productType']").simulate("change", {value: "Pregnant"})

            expect(latestBroadcastedState.productType).toBe("Pregnant")
        })
    })
})
