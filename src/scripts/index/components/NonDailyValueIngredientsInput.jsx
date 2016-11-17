import React from 'react'

export default class NonDailyValueIngredientsInput extends React.Component {
    render (){
        var ingredients = this.props.value || []

        return (
            <div>
                <ul className="list-group">
                    { 
                        ingredients.map((i, idx) => <li className="list-group-item" key={idx}>
                              <span>
                                {i.name} {i.source} <span className="badge">{i.quantity} {i.unit}</span>
                              </span>

                              <span className="pull-right">
                                <a href="#">x</a>
                              </span>
                            </li>
                        ) 
                    }
                </ul>
            </div>
        )
    }
}