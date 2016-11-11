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
        beforeEach(() => {
            seededProductTypes = {
                toddlers: "Toddlers",
                pregnant: "Pregnant"
            }
        })

        test("Selects the first product type", () => {
            const component = shallow(
                <SupplementFactsInput ProductTypesDataService={productTypesDataServiceMock}/>
            )

            expect(component.state().productType).toBe("Toddlers")
            expect(component.find("#selectProductType Select").props().value).toBe("Toddlers")
        })

        test("The product type is not clearable", () => {
            const component = shallow(
                <SupplementFactsInput ProductTypesDataService={productTypesDataServiceMock}/>
            )

            expect(component.find("#selectProductType Select").props().clearable).toBe(false)
        })

        test("Displays one option per product type", () => {
            const component = shallow(
                <SupplementFactsInput ProductTypesDataService={productTypesDataServiceMock}/>
            )

            expect(component.find("#selectProductType Select").props().options).toEqual([
                {value: "Toddlers", label: "Toddlers"},
                {value: "Pregnant", label: "Pregnant"}
            ])
        })

        test("Product type changes are broadcasted", () => {
            const component = shallow(
                <SupplementFactsInput ProductTypesDataService={productTypesDataServiceMock} onChange={onChangeHandler}/>
            )

            component.find('#selectProductType Select').props().onChange({value: "Pregnant"})

            expect(latestBroadcastedState.productType).toBe("Pregnant")
        })
    })
})
