export default class DataTransformer {
    generateLabelData(supplementFactsInput){
        //TODO: remove all of this shit
        if (!supplementFactsInput){
            return {
                servingSizeInfo: {
                    value: 23,
                    type: "packet",
                    additionalComments: "(8g) 1 tbsp",
                    servingsPerContainer: 10
                },
                percentOfDailyValueAdditionalSymbol: "^",
                disclaimers: {
                    percentOfDailyValueAdditionalSymbol: "^",
                    displayDailyValueNotEstablished: true,
                    displayChildrenDisclaimer: true,
                    displayPregnantWomenDisclaimer: true
                },
                otherIngredients: {
                    otherIngredients: "pb, hg",
                    allergens: "nuts, penicillin"
                },
                businessInfo: {
                    distributedByLabel: "Distributed by",
                    businessName: "Apple",
                    streetAddressLine1: "One infinite loop",
                    streetAddressLine2: " --- ",
                    city: "cupertino",
                    state: "CA",
                    zipCode: "55555",
                    phone: "1-800-my-apple"
                },
                dailyValueIngredients: [
                    {name: "Vitamin A", source: "AAAA", quantity: 14, unit: "mg", percentage: "15 %"},
                    {name: "Vitamin C", source: "BBBB", quantity: 10, unit: "mg", percentage: "5 %"},
                    {name: "Vitamin D", source: "CCCC", quantity: 11, unit: "mg", percentage: "< 1 %"}
                ],
                nonDailyValueIngredients: [
                    {name: "Calcium", source: "AAAA", quantity: 14, unit: "mg"},
                    {name: "Chlorine", quantity: 14, unit: "mg"},
                    {name: "Sodium", quantity: 14, unit: "mg"}
                ]
            }
        }

        var result = {
            businessInfo: {},
            disclaimers: {
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
        result.disclaimers.displayDailyValueNotEstablished = inputNonDailyValueIngredients.length > 0
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

        return result
    }
}