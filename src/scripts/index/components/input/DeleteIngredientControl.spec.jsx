import React from "react"
import {shallow} from "enzyme"
import DeleteIngredientControl from "./DeleteIngredientControl.jsx"

test("Returns null when there is no ingredient info", () => {
    var clicks = 0
    function seededOnClickEvent(argument) {
        clicks++
    }

    const component = shallow(
        <DeleteIngredientControl onClick={seededOnClickEvent} />
    )
    component.find("a").simulate("click")
    component.find("a").simulate("click")

    expect(clicks).toBe(2)
})
