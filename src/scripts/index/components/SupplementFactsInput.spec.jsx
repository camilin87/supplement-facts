import React from "react"
import {shallow} from "enzyme"
import SupplementFactsInput from "./SupplementFactsInput.jsx"

var seededProductTypes = {
    adults: "Adults",
    infants: "Infants",
    toddlers: "Toddlers",
    pregnant: "Pregnant"
}
const productTypesDataServiceMock = { read: () => seededProductTypes }

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

        expect(component.find({name: "select-product-type"}).props().value).toBe("Toddlers")
    })

    test("The product type is not clearable", () => {
        const component = shallow(
            <SupplementFactsInput ProductTypesDataService={productTypesDataServiceMock}/>
        )

        expect(component.find({name: "select-product-type"}).props().clearable).toBe(false)
    })

    test("Displays one option per product type", () => {
        const component = shallow(
            <SupplementFactsInput ProductTypesDataService={productTypesDataServiceMock}/>
        )

        expect(component.find({name: "select-product-type"}).props().options).toEqual([
            {value: "Toddlers", label: "Toddlers"},
            {value: "Pregnant", label: "Pregnant"}
        ])
    })
})

