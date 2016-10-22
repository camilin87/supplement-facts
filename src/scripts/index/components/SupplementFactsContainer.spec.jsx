import React from "react"
import {shallow} from "enzyme"
import SupplementFactsContainer from "./SupplementFactsContainer.jsx"

test("Doesn't blow up on empty data", () => {
    var vm = {}

    const component = shallow(
        <SupplementFactsContainer data={vm} />
    )
})
