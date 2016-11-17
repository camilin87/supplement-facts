import React from "react"
import {shallow} from "enzyme"
import NonDailyValueIngredientsInput from "./NonDailyValueIngredientsInput.jsx"

describe("NonDailyValueIngredientsInput", () => {
    var latestBroadcastedState = null
    var onChangeHandler = change => {
        latestBroadcastedState = change
    }

    beforeEach(() => {
        latestBroadcastedState = null
    })

    test("Returns no items when there are no ingredients", () => {
        const component = shallow(
            <NonDailyValueIngredientsInput value={[]} />
        )

        expect(component.find("li").length).toBe(0)
    })

    test("Returns one item per defined ingredient", () => {
        var ingredients = [
            {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg"},
            {name: "Chlorine", quantity: 14, unit: "mcg"}
        ]

        const component = shallow(
            <NonDailyValueIngredientsInput value={ingredients} />
        )

        expect(component.find("li").map(n => n.text().replace(/\s/g, ""))).toEqual([
            "CalciumAAAA14mgx",
            "Chlorine14mcgx"
        ])
        expect(component.find("a").map(n => n.text())).toEqual(["x", "x"])
    })
})

