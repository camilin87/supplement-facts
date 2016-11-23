import React from 'react'

export default class ServingSize extends React.Component {
    render (){

        if (!this.props.servingSize){
            return (null)
        }

        var ss = this.props.servingSize

        var servingSizeText = `Serving Size ${ss.value} ${ss.type} ${ss.additionalComments}`

        var servingsPerContainer = ""
        if (ss.servingsPerContainer){
            servingsPerContainer = `Servings Per Container ${ss.servingsPerContainer}`
        }

        return (
            <div>
                <div>{servingSizeText}</div>
                <div>{servingsPerContainer}</div>
            </div>
        )
    }
}