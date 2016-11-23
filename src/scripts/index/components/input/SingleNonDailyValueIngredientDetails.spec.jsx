import React from "react"
import {shallow} from "enzyme"
import SingleNonDailyValueIngredientDetails from "./SingleNonDailyValueIngredientDetails.jsx"

test("Returns null when there is no ingredient info", () => {
    const component = shallow(
        <SingleNonDailyValueIngredientDetails ingredient={null} />
    )

    expect(component.html()).toBe(null)
})

test("displays the ingredient details", () => {
    var ingredient = {
        name: "glicerin",
        source: "AAA",
        quantity: 10,
        unit: "mcg"
    }

    const component = shallow(
        <SingleNonDailyValueIngredientDetails ingredient={ingredient} />
    )

    expect(component.text()).toBe("glicerin AAA 10 mcg")
})
