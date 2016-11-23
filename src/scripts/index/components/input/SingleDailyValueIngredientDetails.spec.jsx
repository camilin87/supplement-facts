import React from "react"
import {shallow} from "enzyme"
import SingleDailyValueIngredientDetails from "./SingleDailyValueIngredientDetails.jsx"

describe("SingleDailyValueIngredientDetails", () => {
    const dailyValueIngredientsDataServiceMock = {
        all: () => [
            {name: "Vitamin A", unit: "IU", values: [1000, 2000, 3000, 4000]},
            {name: "Vitamin B", unit: "IU", values: [1001, 2001, 3001, 4001]},
            {name: "Vitamin C", unit: "IU", values: [1002, 2002, 3002, 4002]},
            {name: "Vitamin D", unit: "mg", values: [1003, 2003, 3003, 4003]}
        ]
    }

    test("Returns null when there is no ingredient info", () => {
        const component = shallow(
            <SingleDailyValueIngredientDetails 
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                ingredient={null} />
        )

        expect(component.html()).toBe(null)
    })

    test("displays the ingredient details", () => {
        var ingredient = {
            name: "Vitamin A",
            source: "BBB",
            quantity: 10
        }

        const component = shallow(
            <SingleDailyValueIngredientDetails 
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                ingredient={ingredient} />
        )

        expect(component.text()).toBe("Vitamin A BBB10 IU")
    })
})

