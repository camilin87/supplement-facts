import React from "react"
import {shallow} from "enzyme"
import SupplementFactsInput from "./SupplementFactsInput.jsx"

describe("SupplementFactsInput", () => {
    var component = null

    var seededProductTypes = null
    var seededServingSizeInfoTypes = null
    var seededAllergens = null

    const presetsDataServiceMock = { 
        readProductTypes: () => seededProductTypes,
        readServingSizeInfoTypes: () => seededServingSizeInfoTypes,
        readAllergens: () => seededAllergens
    }
    const dailyValueIngredientsDataServiceMock = {
        name: "daily value ingredients data sevice mock"
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

        seededAllergens = [
            "Peanuts",
            "Soy",
            "Shellfish"
        ]
    })

    test("default state", () => {
        component = shallow(
            <SupplementFactsInput
                PresetsDataService={presetsDataServiceMock}
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                onChange={onChangeHandler}/>
        )

        expect(component.state()).toEqual({
            productType: "Adults",
            percentOfDailyValueAdditionalSymbol: "",
            servingSizeInfoValue: 0,
            servingSizeInfoType: "",
            servingSizeInfoAdditionalComments: "",
            servingSizeInfoServingsPerContainer: 1,
            otherIngredients: [],
            allergens: [],
            businessInfoDistributedByLabel: "Distributed by",
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

    describe("Text fields", () => {
        var propertyUnderTest = null
        function controlUnderTest(){
            return component.find(`input[name='${propertyUnderTest}']`)
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
                <SupplementFactsInput
                    PresetsDataService={presetsDataServiceMock}
                    DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                    onChange={onChangeHandler}/>
            )
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
        var propertyUnderTest = null
        function controlUnderTest(){
            return component.find(`Select[name='${propertyUnderTest}']`)
        }

        describe("Product Type Selection", () => {
            beforeEach(() => {
                propertyUnderTest = "productType"

                seededProductTypes = {
                    toddlers: "Toddlers",
                    pregnant: "Pregnant"
                }

                component = shallow(
                    <SupplementFactsInput
                        PresetsDataService={presetsDataServiceMock}
                        DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                        onChange={onChangeHandler}/>
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
                    <SupplementFactsInput
                        PresetsDataService={presetsDataServiceMock}
                        DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                        onChange={onChangeHandler}/>
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

    describe("Tags", () => {
        var propertyUnderTest = null
        function controlUnderTest(){
            return component.find(`[name='${propertyUnderTest}']`)
        }

        describe("Allergens", () => {
            beforeEach(() => {
                propertyUnderTest = "allergens"

                component = shallow(
                    <SupplementFactsInput
                        PresetsDataService={presetsDataServiceMock}
                        DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                        onChange={onChangeHandler}/>
                )
            })

            test("displays no allergens by default", () => {
                expect(controlUnderTest().props().tags).toEqual([])
            })

            test("has suggested values", () => {
                expect(controlUnderTest().props().suggestions).toEqual(seededAllergens)
            })

            test("adds allergens", () => {
                controlUnderTest().props().handleAddition("lead")

                expect(latestBroadcastedState.allergens).toEqual([
                    {id: 1, text: "lead"}
                ])
                expect(controlUnderTest().props().tags).toEqual([
                    {id: 1, text: "lead"}
                ])
            })

            test("removes allergens", () => {
                controlUnderTest().props().handleAddition("penicillin")
                controlUnderTest().props().handleAddition("peanuts")

                controlUnderTest().props().handleDelete(0)

                expect(latestBroadcastedState.allergens).toEqual([
                    {id: 2, text: "peanuts"}
                ])
                expect(controlUnderTest().props().tags).toEqual([
                    {id: 2, text: "peanuts"}
                ])
            })
        })
    })

    describe("Other Ingredients", () => {
        function controlUnderTest(){
            return component.find(`OtherIngredientsInput[name='otherIngredients']`)
        }

        test("displays no other ingredients by default", () => {
            expect(controlUnderTest().props().value).toEqual([])
        })

        test("on change replaces the other ingredients", () => {
            controlUnderTest().simulate("change", [
                {name: "hg", quantity: 10}
            ])

            expect(latestBroadcastedState.otherIngredients).toEqual([
                {name: "hg", quantity: 10}
            ])
            expect(controlUnderTest().props().value).toEqual([
                {name: "hg", quantity: 10}
            ])
        })
    })

    describe("Non Daily Value Ingredients", () => {
        function controlUnderTest(){
            return component.find(`NonDailyValueIngredientsInput[name='nonDailyValueIngredients']`)
        }

        test("displays no nondv ingredients by default", () => {
            expect(controlUnderTest().props().value).toEqual([])
        })

        test("on change replaces the nondv ingredients", () => {
            controlUnderTest().simulate("change", [
                {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg"}
            ])

            expect(latestBroadcastedState.nonDailyValueIngredients).toEqual([
                {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg"}
            ])
            expect(controlUnderTest().props().value).toEqual([
                {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg"}
            ])
        })
    })

    describe("Daily Value Ingredients", () => {
        function controlUnderTest(){
            return component.find(`DailyValueIngredientsInput[name='dailyValueIngredients']`)
        }

        test("displays no dv ingredients by default", () => {
            expect(controlUnderTest().props().value).toEqual([])
        })

        test("injects the daily value ingredients data service", () => {
            expect(controlUnderTest().props().DailyValueIngredientsDataService).toBe(dailyValueIngredientsDataServiceMock)
        })

        test("on change replaces the dv ingredients", () => {
            controlUnderTest().simulate("change", [
                {name: "Chlorine", source: "AAAA", quantity: 14}
            ])

            expect(latestBroadcastedState.dailyValueIngredients).toEqual([
                {name: "Chlorine", source: "AAAA", quantity: 14}
            ])
            expect(controlUnderTest().props().value).toEqual([
                {name: "Chlorine", source: "AAAA", quantity: 14}
            ])
        })
    })

    describe("BusinessInfo", () => {
        function controlUnderTest(){
            return component.find(`BusinessInfoInput`)
        }

        test("Displays the default business info by default", () => {
            expect(controlUnderTest().props().value.businessInfoDistributedByLabel).toEqual(component.state().businessInfoDistributedByLabel)
            expect(controlUnderTest().props().value.businessInfoBusinessName).toEqual(component.state().businessInfoBusinessName)
            expect(controlUnderTest().props().value.businessInfoStreetAddressLine1).toEqual(component.state().businessInfoStreetAddressLine1)
            expect(controlUnderTest().props().value.businessInfoStreetAddressLine2).toEqual(component.state().businessInfoStreetAddressLine2)
            expect(controlUnderTest().props().value.businessInfoCity).toEqual(component.state().businessInfoCity)
            expect(controlUnderTest().props().value.businessInfoState).toEqual(component.state().businessInfoState)
            expect(controlUnderTest().props().value.businessInfoZipCode).toEqual(component.state().businessInfoZipCode)
            expect(controlUnderTest().props().value.businessInfoPhone).toEqual(component.state().businessInfoPhone)
        })

        test("on change replaces the broacasted property", () => {
            controlUnderTest().simulate("change", { businessInfoDistributedByLabel: "sold by" })
            expect(latestBroadcastedState.businessInfoDistributedByLabel).toBe("sold by")

            controlUnderTest().simulate("change", {businessInfoBusinessName: "tdd apps" })
            expect(latestBroadcastedState.businessInfoBusinessName).toBe("tdd apps")

            controlUnderTest().simulate("change", {businessInfoStreetAddressLine1: "111 NW 1 st" })
            expect(latestBroadcastedState.businessInfoStreetAddressLine1).toBe("111 NW 1 st")

            controlUnderTest().simulate("change", {businessInfoStreetAddressLine2: "apt 1" })
            expect(latestBroadcastedState.businessInfoStreetAddressLine2).toBe("apt 1")

            controlUnderTest().simulate("change", {businessInfoCity: "miami" })
            expect(latestBroadcastedState.businessInfoCity).toBe("miami")

            controlUnderTest().simulate("change", {businessInfoState: "fl" })
            expect(latestBroadcastedState.businessInfoState).toBe("fl")

            controlUnderTest().simulate("change", {businessInfoZipCode: "33333" })
            expect(latestBroadcastedState.businessInfoZipCode).toBe("33333")

            controlUnderTest().simulate("change", {businessInfoPhone: "3053053055" })
            expect(latestBroadcastedState.businessInfoPhone).toBe("3053053055")

            expect(controlUnderTest().props().value.businessInfoDistributedByLabel).toEqual("sold by")
            expect(controlUnderTest().props().value.businessInfoBusinessName).toEqual("tdd apps")
            expect(controlUnderTest().props().value.businessInfoStreetAddressLine1).toEqual("111 NW 1 st")
            expect(controlUnderTest().props().value.businessInfoStreetAddressLine2).toEqual("apt 1")
            expect(controlUnderTest().props().value.businessInfoCity).toEqual("miami")
            expect(controlUnderTest().props().value.businessInfoState).toEqual("fl")
            expect(controlUnderTest().props().value.businessInfoZipCode).toEqual("33333")
            expect(controlUnderTest().props().value.businessInfoPhone).toEqual("3053053055")
        })
    })
})
