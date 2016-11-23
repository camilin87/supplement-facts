import React from "react"
import {shallow} from "enzyme"
import DailyValueSeparator from "./DailyValueSeparator.jsx"

test("Returns null when there are no ingredients", () => {
    const component = shallow(
        <DailyValueSeparator ingredients={[]} />
    )

    expect(component.html()).toBe(null)
})

test("Returns the header only when no additional symbol is defined", () => {
    var ingredients = [
        {}, {}
    ]

    const component = shallow(
        <DailyValueSeparator ingredients={ingredients} />
    )

    expect(component.html()).not.toBe(null)
})