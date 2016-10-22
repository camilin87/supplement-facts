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
