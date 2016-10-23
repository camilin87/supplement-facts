import React from "react"
import {shallow} from "enzyme"
import IngredientSeparator from "./IngredientSeparator.jsx"

test("Returns null for the last ingredient", () => {
    const component = shallow(
        <IngredientSeparator isLast={true} />
    )

    expect(component.html()).toBe(null)
})

test("Returns a separator for all the other", () => {
    const component = shallow(
        <IngredientSeparator isLast={null} />
    )

    expect(component.html()).not.toBe(null)
})