import React from "react"
import {shallow} from "enzyme"
import OtherIngredientsInput from "./OtherIngredientsInput.jsx"

test("Returns no items when there are no ingredients", () => {
    const component = shallow(
        <OtherIngredientsInput value={[]} />
    )

    expect(component.find("li").length).toBe(0)
})

test("Returns one item per defined ingredient", () => {
    var ingredients = [
        {name: "hg", quantity: 10},
        {name: "pb", quantity: 1000}
    ]

    const component = shallow(
        <OtherIngredientsInput value={ingredients} />
    )

    expect(component.find("li").map(n => n.text())).toEqual([
        "hg 10mg",
        "pb 1000mg"
    ])
})