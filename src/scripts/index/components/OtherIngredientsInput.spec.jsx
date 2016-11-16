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
        "hg 10 mg",
        "pb 1000 mg"
    ])
})

test("has the correct input controls", () => {
    const component = shallow(
        <OtherIngredientsInput value={[]} />
    )

    expect(component.find("input[type='text']").length).toBe(2)
    expect(component.find("input[type='text'][name='otherIngredientName']").length).toBe(1)
    expect(component.find("input[type='text'][name='otherIngredientQuantity']").length).toBe(1)
    expect(component.find("button").length).toBe(1)
})