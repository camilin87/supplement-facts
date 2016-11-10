export default class DataTransformer {
    constructor(dailyValueIngredientsDataService){
        this._dailyValueIngredientsDataService = dailyValueIngredientsDataService
        this._PRODUCT_TYPES = {
            adults: "Adults",
            infants: "Infants",
            toddlers: "Toddlers",
            pregnant: "Pregnant"
        }
    }

    generateLabelData(supplementFactsInput){
        var result = {
            businessInfo: {},
            disclaimers: {
                displayDailyValueNotEstablished: false,
                displayChildrenDisclaimer: false,
                displayPregnantWomenDisclaimer: false
            },
            servingSizeInfo: {},
            otherIngredients: {},
            dailyValueIngredients: [],
            nonDailyValueIngredients: []
        }

        result.otherIngredients.otherIngredients = (supplementFactsInput.otherIngredients || [])
            .sort((a, b) => a.quantity >= b.quantity ? -1 : 1)
            .map(i => i.name)
            .join(", ")

        result.otherIngredients.allergens = (supplementFactsInput.allergens || []).join(", ")

        result.percentOfDailyValueAdditionalSymbol = supplementFactsInput.percentOfDailyValueAdditionalSymbol || ""
        result.disclaimers.percentOfDailyValueAdditionalSymbol = result.percentOfDailyValueAdditionalSymbol

        var inputServingSizeInfo = supplementFactsInput.servingSizeInfo || {}
        result.servingSizeInfo.value = inputServingSizeInfo.value
        result.servingSizeInfo.servingsPerContainer = inputServingSizeInfo.servingsPerContainer
        result.servingSizeInfo.type = inputServingSizeInfo.type || ""
        result.servingSizeInfo.additionalComments = inputServingSizeInfo.additionalComments || ""

        var inputBusinessInfo = supplementFactsInput.businessInfo || {}
        result.businessInfo.distributedByLabel = inputBusinessInfo.distributedByLabel || ""
        result.businessInfo.businessName = inputBusinessInfo.businessName || ""
        result.businessInfo.streetAddressLine1 = inputBusinessInfo.streetAddressLine1 || ""
        result.businessInfo.streetAddressLine2 = inputBusinessInfo.streetAddressLine2 || ""
        result.businessInfo.city = inputBusinessInfo.city || ""
        result.businessInfo.state = inputBusinessInfo.state || ""
        result.businessInfo.zipCode = inputBusinessInfo.zipCode || ""
        result.businessInfo.phone = inputBusinessInfo.phone || ""

        var inputNonDailyValueIngredients = supplementFactsInput.nonDailyValueIngredients || []
        this._updateNonDailyValueDisclaimers(supplementFactsInput.productType, inputNonDailyValueIngredients, result.disclaimers)

        result.nonDailyValueIngredients = inputNonDailyValueIngredients
            .sort((a, b) => a.quantity >= b.quantity ? -1 : 1)
            .map(i => {
                return {
                    name: i.name || "",
                    source: i.source || "",
                    quantity: i.quantity,
                    unit: i.unit || ""
                }
            })

        var dailyValueIngredients = (supplementFactsInput.dailyValueIngredients || [])
        if (dailyValueIngredients.length > 0){
            var allIngredients = this._dailyValueIngredientsDataService.all()

            result.dailyValueIngredients = dailyValueIngredients.map(sourceIngredient => {
                var matchingIngredient = allIngredients.find(j => j.name === sourceIngredient.name)

                var dailyValue = this._readDailyValue(supplementFactsInput.productType, matchingIngredient.values)

                sourceIngredient.percentage = this._readIngredientPercentageText(sourceIngredient.quantity, dailyValue)
                sourceIngredient.unit = matchingIngredient.unit

                return sourceIngredient
            })
        }

        return result
    }

    _updateNonDailyValueDisclaimers(productType, ingredients, disclaimers){
        if (ingredients.length <= 0) {
            return;
        }

        disclaimers.displayDailyValueNotEstablished = true

        if (productType === this._PRODUCT_TYPES.toddlers || productType === this._PRODUCT_TYPES.infants){
            disclaimers.displayChildrenDisclaimer = true
        }

        if (productType === this._PRODUCT_TYPES.pregnant){
            disclaimers.displayPregnantWomenDisclaimer = true
        }
    }

    _readIngredientPercentageText(quantity, dailyValue){
        var percentage = Math.floor(quantity * 100.0 / dailyValue)

        if (percentage < 1){
            return "< 1%"
        }

        return `${percentage}%`
    }

    _readDailyValue(productType, ingredientValues){
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