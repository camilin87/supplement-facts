import React from "react"
import {shallow} from "enzyme"
import ServingSize from "./ServingSize.jsx"

test("Returns null when there is no ServingSize info", () => {
    const component = shallow(
        <ServingSize servingSize={null} />
    )

    expect(component.html()).toBe(null)
})

test("Returns the serving size line", () => {
    var info = {
        value: 23,
        type: "packet",
        additionalComments: "(8g) 1 tbsp"
    }

    const component = shallow(
        <ServingSize servingSize={info} />
    )

    expect(component.text()).toContain("Serving Size 23 packet (8g) 1 tbsp")
})

test("Returns the servings per container", () => {
    var info = {
        servingsPerContainer: 10
    }

    const component = shallow(
        <ServingSize servingSize={info} />
    )

    expect(component.text()).toContain("Servings Per Container 10")
})

test("does not display servings per container when not specified", () => {
    var info = {}

    const component = shallow(
        <ServingSize servingSize={info} />
    )

    expect(component.text()).not.toContain("Servings Per Container")
})