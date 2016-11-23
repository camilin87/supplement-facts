import React from "react"
import {shallow} from "enzyme"
import SingleOtherIngredientDetails from "./SingleOtherIngredientDetails.jsx"

test("Returns null when there is no ingredient info", () => {
    const component = shallow(
        <SingleOtherIngredientDetails ingredient={null} />
    )

    expect(component.html()).toBe(null)
})

test("displays the ingredient details", () => {
    var ingredient = {
        name: "glicerin",
        quantity: 10
    }

    const component = shallow(
        <SingleOtherIngredientDetails ingredient={ingredient} />
    )

    expect(component.text()).toBe("glicerin 10 mg")
})
