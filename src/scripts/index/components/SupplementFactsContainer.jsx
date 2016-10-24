import React from 'react'
import ServingSize from './ServingSize.jsx'
import SingleIngredient from './SingleIngredient.jsx'
import IngredientsHeader from './IngredientsHeader.jsx'
import NonDailyValueSeparator from './NonDailyValueSeparator.jsx'
import DisplayDisclaimers from './DisplayDisclaimers.jsx'
import DisplayOtherIngredients from './DisplayOtherIngredients.jsx'
import BusinessInfo from './BusinessInfo.jsx'

export default class SupplementFactsContainer extends React.Component {
    initIngredients(arr){
        arr = arr || []

        if (arr.length > 0){
            arr[arr.length - 1].isLast = true
        }

        return arr
    }

    render (){
        var vm = this.props.data

        return (
            <div id="label-container">
                <div className="label-box">
                    <div className="text-center">
                        <h2>Supplement Facts</h2>
                    </div>

                    <ServingSize servingSize={vm.servingSizeInfo} />
                    <hr />

                    <IngredientsHeader addSymbol={vm.percentOfDailyValueAdditionalSymbol}/>
                    <hr className="slim"/>

                    {this.initIngredients(vm.dailyValueIngredients).map(i => <SingleIngredient key={i.name} item={i}/>)}

                    <NonDailyValueSeparator ingredients={vm.nonDailyValueIngredients} />
                    {this.initIngredients(vm.nonDailyValueIngredients).map(i => <SingleIngredient key={i.name} item={i}/>)}
                    <hr />

                    <DisplayDisclaimers info={vm.disclaimers} />
                </div>

                <DisplayOtherIngredients info={vm.otherIngredients} />
                <BusinessInfo info={vm.businessInfo} />
            </div>
        )
    }
}