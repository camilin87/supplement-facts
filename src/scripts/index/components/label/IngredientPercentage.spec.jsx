import React from "react"
import {shallow} from "enzyme"
import IngredientPercentage from "./IngredientPercentage.jsx"

test("Returns the percentage", () => {
    const component = shallow(
        <IngredientPercentage percentage="25 %" />
    )

    expect(component.find("span").text()).toBe("25 %")
})

test("Returns a star when no percentage is defined", () => {
    const component = shallow(
        <IngredientPercentage percentage="" />
    )

    expect(component.find("span").text()).toBe("*")
})