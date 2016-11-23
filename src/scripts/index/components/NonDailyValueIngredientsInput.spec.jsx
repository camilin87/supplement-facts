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

    test("has the correct input controls", () => {
        const component = shallow(
            <NonDailyValueIngredientsInput value={[]} />
        )

        expect(component.find("input").length).toBe(4)
        expect(component.find("input[type='text'][name='nondvIngredientName']").length).toBe(1)
        expect(component.find("input[type='text'][name='nondvIngredientSource']").length).toBe(1)
        expect(component.find("input[type='number'][name='nondvIngredientQuantity']").length).toBe(1)
        expect(component.find("input[type='text'][name='nondvIngredientUnit']").length).toBe(1)
        expect(component.find("button").length).toBe(1)
    })

    test("broadcasts the ingredient creation", () => {
        const component = shallow(
            <NonDailyValueIngredientsInput value={[]} onChange={onChangeHandler} />
        )

        component.find("input[name='nondvIngredientName']").simulate("change", {target: {value: "lead"}})
        component.find("input[name='nondvIngredientSource']").simulate("change", {target: {value: "BBBB"}})
        component.find("input[name='nondvIngredientQuantity']").simulate("change", {target: {value: "13"}})
        component.find("input[name='nondvIngredientUnit']").simulate("change", {target: {value: "mcg"}})
        component.find("button").simulate("click")

        expect(latestBroadcastedState).toEqual([
            {name: "lead", source: "BBBB", quantity: 13, unit: "mcg"},
        ])

        expect(component.state().nondvIngredientName).toBe("")
        expect(component.state().nondvIngredientSource).toBe("")
        expect(component.state().nondvIngredientQuantity).toBe("")
        expect(component.state().nondvIngredientUnit).toBe("mg")
    })

    test("broadcasts the ingredient creation considering what was there before", () => {
        var ingredients = [
            {name: "hg", source: "AAAA", quantity: 13, unit: "mcg"},
            {name: "pb", source: "BBBB", quantity: 15, unit: "mg"}
        ]

        const component = shallow(
            <NonDailyValueIngredientsInput value={ingredients} onChange={onChangeHandler} />
        )

        component.find("input[name='nondvIngredientName']").simulate("change", {target: {value: "lead"}})
        component.find("input[name='nondvIngredientSource']").simulate("change", {target: {value: "DDDD"}})
        component.find("input[name='nondvIngredientQuantity']").simulate("change", {target: {value: "13"}})
        component.find("input[name='nondvIngredientUnit']").simulate("change", {target: {value: "mcg"}})
        component.find("button").simulate("click")

        expect(latestBroadcastedState).toEqual([
            {name: "hg", source: "AAAA", quantity: 13, unit: "mcg"},
            {name: "pb", source: "BBBB", quantity: 15, unit: "mg"},
            {name: "lead", source: "DDDD", quantity: 13, unit: "mcg"}
        ])
    })

    test("deletes the selected ingredient", () => {
        var ingredients = [
            {name: "hg", source: "AAAA", quantity: 13, unit: "mg"},
            {name: "pb", source: "BBBB", quantity: 12, unit: "mg"},
            {name: "lead", source: "CCCC", quantity: 11, unit: "mg"}
        ]

        const component = shallow(
            <NonDailyValueIngredientsInput value={ingredients} onChange={onChangeHandler} />
        )
        component.find("a").at(1).simulate("click")

        expect(latestBroadcastedState).toEqual([
            {name: "hg", source: "AAAA", quantity: 13, unit: "mg"},
            {name: "lead", source: "CCCC", quantity: 11, unit: "mg"}
        ])
    })
})

