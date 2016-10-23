import React from "react"
import {shallow} from "enzyme"
import DailyValueHeader from "./DailyValueHeader.jsx"

test("Returns the header and the additional symbol", () => {
    const component = shallow(
        <DailyValueHeader addSymbol="^" />
    )

    expect(component.find("h3").first().text()).toBe("Amount per Serving")
    expect(component.find("h3").last().text()).toBe("% Daily Value ^")
})

test("Returns the header only when no additional symbol is defined", () => {
    const component = shallow(
        <DailyValueHeader addSymbol="" />
    )

    expect(component.find("h3").last().text()).toBe("% Daily Value")
})