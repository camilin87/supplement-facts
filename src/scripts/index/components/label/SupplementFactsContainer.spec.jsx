import React from "react"
import {shallow} from "enzyme"
import SupplementFactsContainer from "./SupplementFactsContainer.jsx"

test("Doesn't render anything on no data", () => {
    var vm = null

    const component = shallow(
        <SupplementFactsContainer data={vm} />
    )

    expect(component.html()).toBe(null)
})

test("Doesn't render anything on empty data", () => {
    var vm = {}

    const component = shallow(
        <SupplementFactsContainer data={vm} />
    )

    expect(component.html()).toBe(null)
})

test("displays the additional percentage of daily value", () => {
    var vm = {
        percentOfDailyValueAdditionalSymbol: "^^"
    }

    const component = shallow(
        <SupplementFactsContainer data={vm} />
    )

    expect(component.find("IngredientsHeader").props().addSymbol).toBe("^^")
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

    expect(component.find("SingleIngredient").nodes.map(n => n.key)).toEqual(["ingredient1", "ingredient2"])
    expect(component.find("SingleIngredient").nodes.map(n => n.props.item.isLast)).toEqual([false, true])
    expect(component.find("DailyValueSeparator").props().ingredients).toBe(vm.dailyValueIngredients)
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

    expect(component.find("SingleIngredient").nodes.map(n => n.key)).toEqual(["ingredient1", "ingredient2"])
    expect(component.find("SingleIngredient").nodes.map(n => n.props.item.isLast)).toEqual([false, true])
    expect(component.find("NonDailyValueSeparator").props().ingredients).toBe(vm.nonDailyValueIngredients)
})

test("displays the serving size", () => {
    var vm = {
        servingSizeInfo: {
            field1: "blah",
            field2: "blah blah"
        }
    }

    const component = shallow(
        <SupplementFactsContainer data={vm} />
    )

    expect(component.find("ServingSize").props().servingSize).toBe(vm.servingSizeInfo)
})

test("displays the disclaimers", () => {
    var vm = {
        disclaimers: {
            field1: "blah",
            field2: "blah blah"
        }
    }

    const component = shallow(
        <SupplementFactsContainer data={vm} />
    )

    expect(component.find("DisplayDisclaimers").props().info).toBe(vm.disclaimers)
})

test("displays the other ingredients", () => {
    var vm = {
        otherIngredients: {
            field1: "blah",
            field2: "blah blah"
        }
    }

    const component = shallow(
        <SupplementFactsContainer data={vm} />
    )

    expect(component.find("DisplayOtherIngredients").props().info).toBe(vm.otherIngredients)
})


test("displays the business info", () => {
    var vm = {
        businessInfo: {
            field1: "blah",
            field2: "blah blah"
        }
    }

    const component = shallow(
        <SupplementFactsContainer data={vm} />
    )

    expect(component.find("BusinessInfo").props().info).toBe(vm.businessInfo)
})
