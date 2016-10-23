import React from "react"
import {shallow} from "enzyme"
import DisplayOtherIngredients from "./DisplayOtherIngredients.jsx"

test("Returns null when there is no DisplayOtherIngredients info", () => {
    const component = shallow(
        <DisplayOtherIngredients info={null} />
    )

    expect(component.html()).toBe(null)
})

test("doesn't display anything when no disclaimers are active", () => {
    var info = {}

    const component = shallow(
        <DisplayOtherIngredients info={info} />
    )

    expect(component.text()).toBe("")
})

test("displays the other ingredients", () => {
    var info = {
        otherIngredients: "lead, sulfur"
    }

    const component = shallow(
        <DisplayOtherIngredients info={info} />
    )

    expect(component.text()).toContain("Other Ingredients: lead, sulfur")
})

test("displays the allergens", () => {
    var info = {
        allergens: "nuts, penicillin"
    }

    const component = shallow(
        <DisplayOtherIngredients info={info} />
    )

    expect(component.text()).toContain("Contains: nuts, penicillin")
})

