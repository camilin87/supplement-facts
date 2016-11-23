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

    var component = null

    function productNameSelect(){
        return component.find(`Select[name='dvIngredientName']`)
    }

    beforeEach(() => {
        component = null
        latestBroadcastedState = null
        seededIngredients = [
            {name: "Vitamin A", unit: "IU", values: [1000, 2000, 3000, 4000]},
            {name: "Vitamin B", unit: "IU", values: [1001, 2001, 3001, 4001]},
            {name: "Vitamin C", unit: "IU", values: [1002, 2002, 3002, 4002]},
            {name: "Vitamin D", unit: "mg", values: [1003, 2003, 3003, 4003]}
        ]
    })

    test("Returns no items when there are no ingredients", () => {
        component = shallow(
            <DailyValueIngredientsInput 
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                value={[]}
                onChange={onChangeHandler}
                />
        )

        expect(component.find("li").length).toBe(0)
    })

    test("Returns one item per defined ingredient", () => {
        var ingredients = [
            {name: "Vitamin B", source: "AAAA", quantity: 14},
            {name: "Vitamin D", quantity: 15}
        ]

        component = shallow(
            <DailyValueIngredientsInput 
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                value={ingredients}
                onChange={onChangeHandler}
                />
        )

        expect(component.find("SingleDailyValueIngredientDetails").map(n => n.props().ingredient)).toEqual(ingredients)
        expect(component.find("SingleDailyValueIngredientDetails").map(n => n.props().DailyValueIngredientsDataService)).toEqual([
            dailyValueIngredientsDataServiceMock,
            dailyValueIngredientsDataServiceMock
        ])
        expect(component.find("DeleteIngredientControl").length).toBe(2)
    })

    test("has the correct input controls", () => {
        component = shallow(
            <DailyValueIngredientsInput 
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                value={[]}
                onChange={onChangeHandler}
                />
        )

        expect(component.find("input").length).toBe(2)
        expect(component.find("Select").length).toBe(1)
        expect(component.find("Select[name='dvIngredientName']").length).toBe(1)
        expect(component.find("input[type='text'][name='dvIngredientSource']").length).toBe(1)
        expect(component.find("input[type='number'][name='dvIngredientQuantity']").length).toBe(1)
        expect(component.find("button").length).toBe(1)
    })

    test("The product type is not clearable", () => {
        component = shallow(
            <DailyValueIngredientsInput 
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                value={[]}
                onChange={onChangeHandler}
                />
        )

        expect(productNameSelect().props().clearable).toBe(false)
    })

    test("Ingredient Selection Displays one option per product type", () => {
        component = shallow(
            <DailyValueIngredientsInput 
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                value={[]}
                onChange={onChangeHandler}
                />
        )

        expect(productNameSelect().props().options).toEqual([
            {value: "Vitamin A", label: "Vitamin A"},
            {value: "Vitamin B", label: "Vitamin B"},
            {value: "Vitamin C", label: "Vitamin C"},
            {value: "Vitamin D", label: "Vitamin D"}
        ])
    })

    test("Displays mg as the default unit", () => {
        component = shallow(
            <DailyValueIngredientsInput 
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                value={[]}
                onChange={onChangeHandler}
                />
        )

        expect(component.find("#dvIngredientUnit").text()).toBe("mg")
    })

    test("Updates the unit based on the selected ingredient", () => {
        component = shallow(
            <DailyValueIngredientsInput 
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                value={[]}
                onChange={onChangeHandler}
                />
        )

        productNameSelect().simulate("change", {value: "Vitamin A"})

        expect(component.find("#dvIngredientUnit").text()).toBe("IU")
    })

    test("broadcasts the ingredient creation", () => {
        component = shallow(
            <DailyValueIngredientsInput 
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                value={[]}
                onChange={onChangeHandler}
                />
        )

        productNameSelect().simulate("change", {value: "Vitamin D"})
        component.find("input[name='dvIngredientSource']").simulate("change", {target: {value: "BBBB"}})
        component.find("input[name='dvIngredientQuantity']").simulate("change", {target: {value: "13"}})
        component.find("button").simulate("click")

        expect(latestBroadcastedState).toEqual([
            {name: "Vitamin D", source: "BBBB", quantity: 13}
        ])

        expect(component.state().dvIngredientName).toBe("")
        expect(component.state().dvIngredientSource).toBe("")
        expect(component.state().dvIngredientQuantity).toBe("")
    })

    test("doesn't create anything if no input is given", () => {
        component = shallow(
            <DailyValueIngredientsInput 
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                value={[]}
                onChange={onChangeHandler}
                />
        )

        component.find("button").simulate("click")

        expect(latestBroadcastedState).toEqual(null)
    })

    test("broadcasts the ingredient creation considering what was there before", () => {
        var ingredients = [
            {name: "Vitamin A", source: "AAAA", quantity: 13},
            {name: "Vitamin C", source: "BBBB", quantity: 15}
        ]

        component = shallow(
            <DailyValueIngredientsInput 
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                value={ingredients}
                onChange={onChangeHandler}
                />
        )

        productNameSelect().simulate("change", {value: "Vitamin D"})
        component.find("input[name='dvIngredientSource']").simulate("change", {target: {value: "DDDD"}})
        component.find("input[name='dvIngredientQuantity']").simulate("change", {target: {value: "13"}})
        component.find("button").simulate("click")

        expect(latestBroadcastedState).toEqual([
            {name: "Vitamin A", source: "AAAA", quantity: 13},
            {name: "Vitamin C", source: "BBBB", quantity: 15},
            {name: "Vitamin D", source: "DDDD", quantity: 13}
        ])
    })

    test("deletes the selected ingredient", () => {
        var ingredients = [
            {name: "Vitamin A", source: "AAAA", quantity: 13},
            {name: "Vitamin D", source: "CCCC", quantity: 11},
            {name: "Vitamin C", source: "BBBB", quantity: 15}
        ]

        component = shallow(
            <DailyValueIngredientsInput 
                DailyValueIngredientsDataService={dailyValueIngredientsDataServiceMock}
                value={ingredients}
                onChange={onChangeHandler}
                />
        )
        component.find("DeleteIngredientControl").at(1).simulate("click")

        expect(latestBroadcastedState).toEqual([
            {name: "Vitamin A", source: "AAAA", quantity: 13},
            {name: "Vitamin C", source: "BBBB", quantity: 15}
        ])
    })
})

