import React from "react"
import {shallow} from "enzyme"
import SupplementFactsContainer from "./SupplementFactsContainer.jsx"

test("Returns the header and the additional symbol", () => {
    var vm = {}

    const component = shallow(
        <SupplementFactsContainer viewModel={vm} />
    )
})
