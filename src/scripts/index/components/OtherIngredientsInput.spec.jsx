import React from "react"
import {shallow} from "enzyme"
import OtherIngredientsInput from "./OtherIngredientsInput.jsx"

describe("OtherIngredientsInput", () => {
    var latestBroadcastedState = null
    var onChangeHandler = change => {
        latestBroadcastedState = change
    }

    beforeEach(() => {
        latestBroadcastedState = null
    })

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

    test("broadcasts the ingredient creation", () => {
        const component = shallow(
            <OtherIngredientsInput value={[]} onChange={onChangeHandler} />
        )

        component.find("input[name='otherIngredientName']").simulate("change", {target: {value: "lead"}})
        component.find("input[name='otherIngredientQuantity']").simulate("change", {target: {value: "13"}})
        component.find("button").simulate("click")

        expect(latestBroadcastedState).toEqual([
            {name: "lead", quantity: 13}
        ])

        expect(component.find("input[name='otherIngredientName']").text()).toBe("")
        expect(component.find("input[name='otherIngredientQuantity']").text()).toBe("")

        expect(component.state().otherIngredientName).toBe("")
        expect(component.state().otherIngredientQuantity).toBe("")
    })

    test("broadcasts the ingredient creation considering what was there before", () => {
        var ingredients = [
            {name: "hg", quantity: 10},
            {name: "pb", quantity: 1000}
        ]

        const component = shallow(
            <OtherIngredientsInput value={ingredients} onChange={onChangeHandler} />
        )

        component.find("input[name='otherIngredientName']").simulate("change", {target: {value: "lead"}})
        component.find("input[name='otherIngredientQuantity']").simulate("change", {target: {value: "13"}})
        component.find("button").simulate("click")

        expect(latestBroadcastedState).toEqual([
            {name: "hg", quantity: 10},
            {name: "pb", quantity: 1000},
            {name: "lead", quantity: 13}
        ])
    })
})

