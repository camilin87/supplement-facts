import React from "react"
import {shallow} from "enzyme"
import BusinessInfoInput from "./BusinessInfoInput.jsx"

describe("BusinessInfoInput", () => {
    var component = null
    var latestBroadcastedState = null
    var propertyUnderTest = null
    const defaultState = {
        name: "pepin"
    }

    function seedStatePropertyUnderTest(value) {
        var updatedState = {}
        updatedState[propertyUnderTest] = value

        component.setState(updatedState)
    }
    function controlUnderTest(){
        return component.find(`input[name='${propertyUnderTest}']`)
    }
    function triggerChangeForControlUnderTest(newValue){
        controlUnderTest().simulate("change", {target: {value: newValue}})
    }
    function expectValueForControlUnderTestToBe(expectation){
        expect(controlUnderTest().props().value).toBe(expectation)
    }
    function expectStatePropertyUnderTestToBe(expectation){
        expect(latestBroadcastedState[propertyUnderTest]).toBe(expectation)
    }

    beforeEach(() => {
        latestBroadcastedState = null
        function onChangeHandler(change){
            latestBroadcastedState = change
        }

        component = shallow(
            <BusinessInfoInput 
                value={defaultState}
                onChange={onChangeHandler} />
        )
    })

    test("default state", () => {
        expect(component.state()).toEqual(defaultState)
    })

    describe("businessInfoDistributedByLabel", () => {
        beforeEach(() => {
            propertyUnderTest = "businessInfoDistributedByLabel"
        })

        test("gets displayed", () => {
            seedStatePropertyUnderTest("distributed by")
            expectValueForControlUnderTestToBe("distributed by")
        })

        test("gets updated", () => {
            triggerChangeForControlUnderTest("sold by")
            expectStatePropertyUnderTestToBe("sold by")
        })
    })

    describe("businessInfoBusinessName", () => {
        beforeEach(() => {
            propertyUnderTest = "businessInfoBusinessName"
        })

        test("gets displayed", () => {
            seedStatePropertyUnderTest("tddapps")
            expectValueForControlUnderTestToBe("tddapps")
        })

        test("gets updated", () => {
            triggerChangeForControlUnderTest("tdd apps")
            expectStatePropertyUnderTestToBe("tdd apps")
        })
    })

    describe("businessInfoStreetAddressLine1", () => {
        beforeEach(() => {
            propertyUnderTest = "businessInfoStreetAddressLine1"
        })

        test("gets displayed", () => {
            seedStatePropertyUnderTest("11 nw 1 st")
            expectValueForControlUnderTestToBe("11 nw 1 st")
        })

        test("gets updated", () => {
            triggerChangeForControlUnderTest("11 nw 2 st")
            expectStatePropertyUnderTestToBe("11 nw 2 st")
        })
    })

    describe("businessInfoStreetAddressLine2", () => {
        beforeEach(() => {
            propertyUnderTest = "businessInfoStreetAddressLine2"
        })

        test("gets displayed", () => {
            seedStatePropertyUnderTest("apt 5")
            expectValueForControlUnderTestToBe("apt 5")
        })

        test("gets updated", () => {
            triggerChangeForControlUnderTest("apt 2")
            expectStatePropertyUnderTestToBe("apt 2")
        })
    })

    describe("businessInfoCity", () => {
        beforeEach(() => {
            propertyUnderTest = "businessInfoCity"
        })

        test("gets displayed", () => {
            seedStatePropertyUnderTest("miami")
            expectValueForControlUnderTestToBe("miami")
        })

        test("gets updated", () => {
            triggerChangeForControlUnderTest("new york")
            expectStatePropertyUnderTestToBe("new york")
        })
    })

    describe("businessInfoState", () => {
        beforeEach(() => {
            propertyUnderTest = "businessInfoState"
        })

        test("gets displayed", () => {
            seedStatePropertyUnderTest("fl")
            expectValueForControlUnderTestToBe("fl")
        })

        test("gets updated", () => {
            triggerChangeForControlUnderTest("ny")
            expectStatePropertyUnderTestToBe("ny")
        })
    })

    describe("businessInfoZipCode", () => {
        beforeEach(() => {
            propertyUnderTest = "businessInfoZipCode"
        })

        test("gets displayed", () => {
            seedStatePropertyUnderTest("33333")
            expectValueForControlUnderTestToBe("33333")
        })

        test("gets updated", () => {
            triggerChangeForControlUnderTest("55555")
            expectStatePropertyUnderTestToBe("55555")
        })
    })

    describe("businessInfoPhone", () => {
        beforeEach(() => {
            propertyUnderTest = "businessInfoPhone"
        })

        test("gets displayed", () => {
            seedStatePropertyUnderTest("555-555-5555")
            expectValueForControlUnderTestToBe("555-555-5555")
        })

        test("gets updated", () => {
            triggerChangeForControlUnderTest("1-800-555-5555")
            expectStatePropertyUnderTestToBe("1-800-555-5555")
        })
    })
})

