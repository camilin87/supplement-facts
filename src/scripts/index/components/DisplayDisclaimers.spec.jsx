import React from "react"
import {shallow} from "enzyme"
import DisplayDisclaimers from "./DisplayDisclaimers.jsx"

test("Returns null when there is no DisplayDisclaimers info", () => {
    const component = shallow(
        <DisplayDisclaimers info={null} />
    )

    expect(component.html()).toBe(null)
})

test("returns daily value not established", () => {
    var info = {
        displayDailyValueNotEstablished: true
    }

    const component = shallow(
        <DisplayDisclaimers info={info} />
    )

    expect(component.text()).toContain("* Daily Value not established")
})
