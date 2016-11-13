import React from "react"
import {shallow} from "enzyme"
import SupplementFactsInput from "./SupplementFactsInput.jsx"

describe("SupplementFactsInput", () => {
    var component = null

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

    describe("Text fields", () => {
        function findInputWithName(name){
            return component.find(`input[name='${name}']`)
        }

        var propertyUnderTest = null
        function controlUnderTest(){
            return findInputWithName(propertyUnderTest)
        }
        function seedStatePropertyUnderTest(value) {
            var updatedState = {}
            updatedState[propertyUnderTest] = value

            component.setState(updatedState)
        }
        function triggerChangeForControlUnderTest(newValue){
            controlUnderTest().simulate("change", {target: {value: newValue}})
        }
        function expectStatePropertyUnderTestToBe(expectation){
            expect(latestBroadcastedState[propertyUnderTest]).toBe(expectation)
        }
        function expectValueForControlUnderTestToBe(expectation){
            expect(controlUnderTest().props().value).toBe(expectation)
        }

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

        describe("percentOfDailyValueAdditionalSymbol", () => {
            beforeEach(() => {
                propertyUnderTest = "percentOfDailyValueAdditionalSymbol"
            })

            test("gets displayed", () => {
                seedStatePropertyUnderTest("^")
                expectValueForControlUnderTestToBe("^")
            })

            test("gets updated", () => {
                triggerChangeForControlUnderTest("newValue")
                expectStatePropertyUnderTestToBe("newValue")
            })
        })

        describe("servingSizeInfoValue", () => {
            beforeEach(() => {
                propertyUnderTest = "servingSizeInfoValue"
            })

            test("gets displayed", () => {
                seedStatePropertyUnderTest(10)
                expectValueForControlUnderTestToBe(10)
            })

            test("gets updated", () => {
                triggerChangeForControlUnderTest(11)
                expectStatePropertyUnderTestToBe(11)
            })
        })

        describe("servingSizeInfoAdditionalComments", () => {
            beforeEach(() => {
                propertyUnderTest = "servingSizeInfoAdditionalComments"
            })

            test("gets displayed", () => {
                seedStatePropertyUnderTest("lead container")
                expectValueForControlUnderTestToBe("lead container")
            })

            test("gets updated", () => {
                triggerChangeForControlUnderTest("poison")
                expectStatePropertyUnderTestToBe("poison")
            })
        })

        describe("servingSizeInfoServingsPerContainer", () => {
            beforeEach(() => {
                propertyUnderTest = "servingSizeInfoServingsPerContainer"
            })

            test("gets displayed", () => {
                seedStatePropertyUnderTest(10)
                expectValueForControlUnderTestToBe(10)
            })

            test("gets updated", () => {
                triggerChangeForControlUnderTest(11)
                expectStatePropertyUnderTestToBe(11)
            })
        })
    })

    describe("Dropdowns", () => {
        function findSelectWithName(name){
            return component.find(`Select[name='${name}']`)
        }

        var propertyUnderTest = null
        function controlUnderTest(){
            return findSelectWithName(propertyUnderTest)
        }

        describe("Product Type Selection", () => {
            beforeEach(() => {
                propertyUnderTest = "productType"

                seededProductTypes = {
                    toddlers: "Toddlers",
                    pregnant: "Pregnant"
                }

                component = shallow(
                    <SupplementFactsInput PresetsDataService={presetsDataServiceMock} onChange={onChangeHandler}/>
                )
            })

            test("The product type is not clearable", () => {
                expect(controlUnderTest().props().clearable).toBe(false)
            })

            test("Displays one option per product type", () => {
                expect(controlUnderTest().props().options).toEqual([
                    {value: "Toddlers", label: "Toddlers"},
                    {value: "Pregnant", label: "Pregnant"}
                ])
            })

            test("Product type changes are broadcasted", () => {
                controlUnderTest().simulate("change", {value: "Pregnant"})

                expect(latestBroadcastedState.productType).toBe("Pregnant")
            })

            test("Selects the first product type", () => {
                expect(component.state().productType).toBe("Toddlers")
                expect(controlUnderTest().props().value).toBe("Toddlers")
            })
        })

        describe("Serving Size Selection", () => {
            beforeEach(() => {
                propertyUnderTest = "servingSizeInfoType"

                seededServingSizeInfoTypes = [
                    "Capsule",
                    "Packet"
                ]

                component = shallow(
                    <SupplementFactsInput PresetsDataService={presetsDataServiceMock} onChange={onChangeHandler}/>
                )
            })

            test("The serving size info type is not clearable", () => {
                expect(controlUnderTest().props().clearable).toBe(false)
            })

            test("Displays one option per serving size info type", () => {
                expect(controlUnderTest().props().options).toEqual([
                    {value: "Capsule", label: "Capsule"},
                    {value: "Packet", label: "Packet"}
                ])
            })

            test("Serving Size Info type changes are broadcasted", () => {
                controlUnderTest().simulate("change", {value: "Packet"})

                expect(latestBroadcastedState.servingSizeInfoType).toBe("Packet")
                expect(controlUnderTest().props().value).toBe("Packet")
            })
        })
    })
})
