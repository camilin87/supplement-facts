import React from "react"
import {shallow} from "enzyme"
import DailyValueIngredientsInput from "./DailyValueIngredientsInput.jsx"

describe("DailyValueIngredientsInput", () => {
    var latestBroadcastedState = null
    var onChangeHandler = change => {
        latestBroadcastedState = change
    }

    var seededIngredients = null
    var dailyValueIngredientsDataServiceMock = {
        all: () => seededIngredients
    }

    beforeEach(() => {
        latestBroadcastedState = null
        seededIngredients = [
            {name: "Vitamin A", unit: "IU", values: [1000, 2000, 3000, 4000]},
            {name: "Vitamin B", unit: "IU", values: [1001, 2001, 3001, 4001]},
            {name: "Vitamin C", unit: "IU", values: [1002, 2002, 3002, 4002]},
            {name: "Vitamin D", unit: "IU", values: [1003, 2003, 3003, 4003]}
        ]
    })

    test("Returns no items when there are no ingredients", () => {
        const component = shallow(
            <DailyValueIngredientsInput 
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                value={[]}
                onChange={onChangeHandler}
                />
        )

        expect(component.find("li").length).toBe(0)
    })
})

