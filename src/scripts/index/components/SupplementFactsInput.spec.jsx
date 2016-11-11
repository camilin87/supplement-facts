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

    describe("Product Selection", () => {
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
            expect(component.find("Select#selectProductType").props().value).toBe("Toddlers")
        })

        test("The product type is not clearable", () => {
            expect(component.find("Select#selectProductType").props().clearable).toBe(false)
        })

        test("Displays one option per product type", () => {
            expect(component.find("Select#selectProductType").props().options).toEqual([
                {value: "Toddlers", label: "Toddlers"},
                {value: "Pregnant", label: "Pregnant"}
            ])
        })

        test("Product type changes are broadcasted", () => {
            component.find("Select#selectProductType").props().onChange({value: "Pregnant"})

            expect(latestBroadcastedState.productType).toBe("Pregnant")
        })
    })

    test("default state", () => {
        const component = shallow(
            <SupplementFactsInput ProductTypesDataService={productTypesDataServiceMock} onChange={onChangeHandler}/>
        )

        expect(component.state()).toEqual({
            productType: "Adults",
            percentOfDailyValueAdditionalSymbol: null,
            servingSizeInfo: {
                value: 0,
                type: null,
                additionalComments: null,
                servingsPerContainer: 10
            },
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
})
