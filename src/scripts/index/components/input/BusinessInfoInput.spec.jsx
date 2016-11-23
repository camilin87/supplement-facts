import React from "react"
import {shallow} from "enzyme"
import BusinessInfoInput from "./BusinessInfoInput.jsx"

describe("BusinessInfoInput", () => {
    var component = null
    var lastBroadcastedState = null

    beforeEach(() => {
        lastBroadcastedState = null
        function onChangeHandler(change){
            lastBroadcastedState = change
        }

        component = shallow(
            <BusinessInfoInput onChange={onChangeHandler} />
        )
    })

    test("Returns null when there is no ingredient info", () => {
        expect(component.html()).toBe(null)
    })
})

