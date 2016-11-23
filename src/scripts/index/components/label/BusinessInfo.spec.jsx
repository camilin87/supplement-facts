import React from "react"
import {shallow} from "enzyme"
import BusinessInfo from "./BusinessInfo.jsx"

test("Returns null when there is no BusinessInfo info", () => {
    const component = shallow(
        <BusinessInfo info={null} />
    )

    expect(component.html()).toBe(null)
})

test("doesn't display anything when no disclaimers are active", () => {
    var info = {}

    const component = shallow(
        <BusinessInfo info={info} />
    )

    expect(component.text()).toBe("")
})

test("returns the business name", () => {
    var info = {
        distributedByLabel: "Manufactured by",
        businessName: "Apple"
    }

    const component = shallow(
        <BusinessInfo info={info} />
    )

    expect(component.text()).toContain("Manufactured by Apple")
})

test("returns the business name even if no distributed by label is specified", () => {
    var info = {
        distributedByLabel: "",
        businessName: "Apple"
    }

    const component = shallow(
        <BusinessInfo info={info} />
    )

    expect(component.text()).toContain("Apple")
})

test("returns the business address", () => {
    var info = {
        streetAddressLine1: "one infinite loop",
        streetAddressLine2: "the sunshine state",
        city: "miami",
        state: "FL",
        zipCode: "33333"
    }

    const component = shallow(
        <BusinessInfo info={info} />
    )

    expect(component.text()).toContain("one infinite loop")
    expect(component.text()).toContain("the sunshine state")
    expect(component.text()).toContain("miami FL 33333")
})

test("returns the phone number", () => {
    var info = {
        phone: "555-555-5555"
    }

    const component = shallow(
        <BusinessInfo info={info} />
    )

    expect(component.text()).toContain("555-555-5555")
})
