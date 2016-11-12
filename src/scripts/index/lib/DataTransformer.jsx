var pluralize = require("pluralize")
import DailyValueIngredientsDataService from './DailyValueIngredientsDataService.jsx'
import ProductTypesDataService from './ProductTypesDataService.jsx'

export default class DataTransformer {
    constructor(dailyValueIngredientsDataService, productTypesDataService){
        this._dailyValueIngredientsDataService = dailyValueIngredientsDataService || new DailyValueIngredientsDataService()
        this._productTypesDataService = productTypesDataService || new ProductTypesDataService()

        this._PRODUCT_TYPES = this._productTypesDataService.read()
    }

    generateLabelData(input){
        var result = {
            businessInfo: {},
            disclaimers: {},
            servingSizeInfo: {},
            otherIngredients: {},
            dailyValueIngredients: [],
            nonDailyValueIngredients: []
        }

        result.otherIngredients.otherIngredients = this._readOtherIngredients(input.otherIngredients)

        result.otherIngredients.allergens = (input.allergens || []).join(", ")

        result.percentOfDailyValueAdditionalSymbol = input.percentOfDailyValueAdditionalSymbol || ""
        result.servingSizeInfo = this._readServingSizeInfo(input.servingSizeInfo, input)

        var inputBusinessInfo = input.businessInfo || {}
        result.businessInfo.distributedByLabel = inputBusinessInfo.distributedByLabel || ""
        result.businessInfo.businessName = inputBusinessInfo.businessName || ""
        result.businessInfo.streetAddressLine1 = inputBusinessInfo.streetAddressLine1 || ""
        result.businessInfo.streetAddressLine2 = inputBusinessInfo.streetAddressLine2 || ""
        result.businessInfo.city = inputBusinessInfo.city || ""
        result.businessInfo.state = inputBusinessInfo.state || ""
        result.businessInfo.zipCode = inputBusinessInfo.zipCode || ""
        result.businessInfo.phone = inputBusinessInfo.phone || ""

        var nonDailyValueIngredients = input.nonDailyValueIngredients || []
        result.disclaimers = this._readDisclaimers(input.productType, nonDailyValueIngredients, input.percentOfDailyValueAdditionalSymbol)

        result.nonDailyValueIngredients = this._readNonDailyValueIngredients(nonDailyValueIngredients)
        result.dailyValueIngredients = this._readDailyValueIngredients(input.productType, input.dailyValueIngredients || [])

        return result
    }

    _readServingSizeInfo(inputServingSizeInfo, input){
        var inputServingSizeInfo = inputServingSizeInfo || {}

        var result = {
            value: input.servingSizeInfoValue,
            servingsPerContainer: inputServingSizeInfo.servingsPerContainer,
            type: inputServingSizeInfo.type || "",
            additionalComments: inputServingSizeInfo.additionalComments || "",
        }

        if (result.value > 1){
            result.type = pluralize(result.type)
        }

        return result
    }

    _readOtherIngredients(otherIngredients){
        return (otherIngredients || [])
            .sort((a, b) => a.quantity >= b.quantity ? -1 : 1)
            .map(i => i.name)
            .join(", ")
    }

    _readNonDailyValueIngredients(nonDailyValueIngredients){
        return nonDailyValueIngredients
            .sort((a, b) => a.quantity >= b.quantity ? -1 : 1)
            .map(i => {
                return {
                    name: i.name || "",
                    source: i.source || "",
                    quantity: i.quantity,
                    unit: i.unit || ""
                }
            })
    }

    _readDailyValueIngredients(productType, dailyValueIngredients){
        if (dailyValueIngredients.length === 0){
            return []
        }

        var allIngredients = this._dailyValueIngredientsDataService.all()
            .map((i, idx) => {
                i.position = idx
                return i
            })

        return dailyValueIngredients
            .map(sourceIngredient => {
                var matchingIngredient = allIngredients.find(j => j.name === sourceIngredient.name)

                var dailyValue = this._readIngredientDailyValue(productType, matchingIngredient.values)

                sourceIngredient.percentage = this._readIngredientPercentageText(sourceIngredient.quantity, dailyValue)
                sourceIngredient.unit = matchingIngredient.unit
                sourceIngredient.position = matchingIngredient.position

                return sourceIngredient
            }).sort((i, j) => {
                return i.position - j.position
            }).map(i => {
                delete i.position
                return i
            })
    }

    _readDisclaimers(productType, nonDailyValueIngredients, percentOfDailyValueAdditionalSymbol){
        var result = {
            percentOfDailyValueAdditionalSymbol: percentOfDailyValueAdditionalSymbol || "",
            displayDailyValueNotEstablished: false,
            displayChildrenDisclaimer: false,
            displayPregnantWomenDisclaimer: false
        }

        if (nonDailyValueIngredients.length <= 0) {
            return result
        }

        result.displayDailyValueNotEstablished = true

        if (productType === this._PRODUCT_TYPES.toddlers || productType === this._PRODUCT_TYPES.infants){
            result.displayChildrenDisclaimer = true
        }

        if (productType === this._PRODUCT_TYPES.pregnant){
            result.displayPregnantWomenDisclaimer = true
        }

        return result
    }

    _readIngredientPercentageText(quantity, dailyValue){
        var percentage = Math.floor(quantity * 100.0 / dailyValue)

        if (percentage < 1){
            return "< 1%"
        }

        return `${percentage}%`
    }

    _readIngredientDailyValue(productType, ingredientValues){
        var productTypeIndices = [
            this._PRODUCT_TYPES.adults,
            this._PRODUCT_TYPES.infants,
            this._PRODUCT_TYPES.toddlers,
            this._PRODUCT_TYPES.pregnant
        ]
        var index = productTypeIndices.indexOf(productType)
        return ingredientValues[index]
    }
}