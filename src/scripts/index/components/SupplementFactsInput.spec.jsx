import React from "react"
import {shallow} from "enzyme"
import SupplementFactsInput from "./SupplementFactsInput.jsx"

describe("SupplementFactsInput", () => {
    var seededProductTypes = {
        adults: "Adults",
        infants: "Infants",
        toddlers: "Toddlers",
        pregnant: "Pregnant"
    }
    const productTypesDataServiceMock = { read: () => seededProductTypes }

    var latestBroadcastedState = null
    var onChangeHandler = change => {
        latestBroadcastedState = change
    }

    beforeEach(() => {
        latestBroadcastedState = null
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
            expect(component.find("#selectProductType Select").props().value).toBe("Toddlers")
        })

        test("The product type is not clearable", () => {
            expect(component.find("#selectProductType Select").props().clearable).toBe(false)
        })

        test("Displays one option per product type", () => {
            expect(component.find("#selectProductType Select").props().options).toEqual([
                {value: "Toddlers", label: "Toddlers"},
                {value: "Pregnant", label: "Pregnant"}
            ])
        })

        test("Product type changes are broadcasted", () => {
            component.find("#selectProductType Select").props().onChange({value: "Pregnant"})

            expect(latestBroadcastedState.productType).toBe("Pregnant")
        })
    })
})
