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
