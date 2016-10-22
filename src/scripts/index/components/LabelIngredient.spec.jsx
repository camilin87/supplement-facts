import React from "react"
import {shallow} from "enzyme"
import LabelIngredient from "./LabelIngredient.jsx"

test("Renders the elements", () => {
    const ingredient = {
        name: "Calcium",
        source: "AAAA",
        quantity: 14,
        unit: "mg",
        percentage: "15 %"
    }

    const component = shallow(
        <LabelIngredient item={ingredient} />
    )

    expect(component.find("IngredientSource").props().source).toBe("AAAA")
    expect(component.find("IngredientPercentage").props().percentage).toBe("15 %")

    expect(component.text()).toContain("Calcium")
    expect(component.text()).toContain("14 mg")
})
