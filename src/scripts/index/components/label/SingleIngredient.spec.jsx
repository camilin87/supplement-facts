import React from "react"
import {shallow} from "enzyme"
import SingleIngredient from "./SingleIngredient.jsx"

test("Renders the elements", () => {
    const ingredient = {
        name: "Calcium",
        source: "AAAA",
        quantity: 14,
        unit: "mg",
        percentage: "15 %"
    }

    const component = shallow(
        <SingleIngredient item={ingredient} />
    )

    expect(component.find("IngredientSource").props().source).toBe("AAAA")
    expect(component.find("IngredientPercentage").props().percentage).toBe("15 %")

    expect(component.text()).toContain("Calcium")
    expect(component.text()).toContain("14 mg")

    expect(component.find("IngredientSeparator").props().isLast).not.toBe(true)
    
})

test("doesn't render the separator for the last element", () => {
    const ingredient = {
        isLast: true
    }

    const component = shallow(
        <SingleIngredient item={ingredient} />
    )

    expect(component.find("IngredientSeparator").props().isLast).toBe(true)
})
