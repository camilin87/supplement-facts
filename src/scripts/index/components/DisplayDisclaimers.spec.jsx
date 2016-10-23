import React from "react"
import {shallow} from "enzyme"
import DisplayDisclaimers from "./DisplayDisclaimers.jsx"

test("Returns null when there is no DisplayDisclaimers info", () => {
    const component = shallow(
        <DisplayDisclaimers info={null} />
    )

    expect(component.html()).toBe(null)
})

test("doesn't display anything when no disclaimers are active", () => {
    var info = {}

    const component = shallow(
        <DisplayDisclaimers info={info} />
    )

    expect(component.text()).toBe("")
})

test("returns daily value not established", () => {
    var info = {
        displayDailyValueNotEstablished: true
    }

    const component = shallow(
        <DisplayDisclaimers info={info} />
    )

    expect(component.text()).toContain("* Daily Value not established")
})

test("displays the infants disclaimer", () => {
    var info = {
        percentOfDailyValueAdditionalSymbol: "^",
        displayInfantsDisclaimer: true
    }

    const component = shallow(
        <DisplayDisclaimers info={info} />
    )

    expect(component.text()).toContain("^ Daily Value only for infants")
})

test("displays the Children disclaimer", () => {
    var info = {
        percentOfDailyValueAdditionalSymbol: "^",
        displayChildrenDisclaimer: true
    }

    const component = shallow(
        <DisplayDisclaimers info={info} />
    )

    expect(component.text()).toContain("^ Daily Value only for children")
})

test("displays the pregnant women disclaimer", () => {
    var info = {
        percentOfDailyValueAdditionalSymbol: "^",
        displayPregnantWomenDisclaimer: true
    }

    const component = shallow(
        <DisplayDisclaimers info={info} />
    )

    expect(component.text()).toContain("^ Daily Value only for pregnant women")
})

