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
})

