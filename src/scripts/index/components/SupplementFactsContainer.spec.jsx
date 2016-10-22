import React from "react"
import {shallow} from "enzyme"
import SupplementFactsContainer from "./SupplementFactsContainer.jsx"

test("Doesn't blow up on empty data", () => {
    var vm = {}

    const component = shallow(
        <SupplementFactsContainer data={vm} />
    )
})

test("displays the additional percentage of daily value", () => {
    var vm = {
        percentOfDailyValueAdditionalSymbol: "^^"
    }

    const component = shallow(
        <SupplementFactsContainer data={vm} />
    )

    expect(component.find("DailyValueHeader").props().addSymbol).toBe("^^")
})

test("displays the daily value ingredients", () => {
    var vm = {
        dailyValueIngredients: [
            {name: "ingredient1"},
            {name: "ingredient2"}
        ]
    }

    const component = shallow(
        <SupplementFactsContainer data={vm} />
    )

    expect(component.find("LabelIngredient").nodes.map(n => n.key)).toEqual(["ingredient1", "ingredient2"])
})

test("displays the non daily value ingredients", () => {
    var vm = {
        nonDailyValueIngredients: [
            {name: "ingredient1"},
            {name: "ingredient2"}
        ]
    }

    const component = shallow(
        <SupplementFactsContainer data={vm} />
    )

    expect(component.find("LabelIngredient").nodes.map(n => n.key)).toEqual(["ingredient1", "ingredient2"])
    expect(component.find("NonDailyValueSeparator").props().ingredients).toBe(vm.nonDailyValueIngredients)
})
