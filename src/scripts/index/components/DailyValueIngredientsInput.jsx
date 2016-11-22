import React from 'react'
import DailyValueIngredientsDataService from '../lib/DailyValueIngredientsDataService.jsx'

export default class DailyValueIngredientsInput extends React.Component {
    constructor(props){
        super(props)

        //**** dependencies ****
        this._dailyValueIngredientsDataService = props["DailyValueIngredientsDataService"] || new DailyValueIngredientsDataService()

        //**** initial state ****

        //**** event handlers *****
    }

    render (){
        var allIngredientPresets = this._dailyValueIngredientsDataService.all()
        var ingredients = (this.props.value || []).map(i => {
            i.unit = allIngredientPresets.find(p => p.name === i.name).unit
            return i
        })

        return (
            <div>
                <ul className="list-group">
                    { 
                        ingredients.map((i, idx) => <li className="list-group-item" key={idx}>
                              <span>
                                {i.name} {i.source} <span className="badge">{i.quantity} {i.unit}</span>
                              </span>

                              <span className="pull-right">
                                <a href="#" onClick="">x</a>
                              </span>
                            </li>
                        ) 
                    }
                </ul>
            </div>
        )
    }
}