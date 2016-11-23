import React from 'react'

export default class SupplementFactsHeader extends React.Component {
    componentDidMount() {
        this.autofitText()
    }

    componentDidUpdate() {
        this.autofitText()
    }

    autofitText() {
        $("#supplementFactsTitle").fitText(0.87)
    }

    render (){
        return (
            <div className="text-center">
                <h2 id="supplementFactsTitle">Supplement Facts</h2>
            </div>
        )
    }
}