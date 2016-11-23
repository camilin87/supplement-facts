import React from "react"
import {shallow} from "enzyme"
import IngredientSource from "./IngredientSource.jsx"

test("Returns the source", () => {
    const component = shallow(
        <IngredientSource source="aisle five" />
    )

    expect(component.text()).toBe("(aisle five)")
})

test("Returns null when no source is defined", () => {
    const component = shallow(
        <IngredientSource source="" />
    )

    expect(component.html()).toBe(null)
})