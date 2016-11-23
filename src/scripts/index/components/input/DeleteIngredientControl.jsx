import React from 'react'

export default class DeleteIngredientControl extends React.Component {
    render (){
        return (
            <span className="pull-right">
                <a href="#" onClick={this.props.onClick}>x</a>
            </span>
        )
    }
}