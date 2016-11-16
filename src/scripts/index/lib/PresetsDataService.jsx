export default class PresetsDataService {
    readProductTypes () {
        return {
            adults: "Adults",
            infants: "Infants",
            toddlers: "Toddlers",
            pregnant: "Pregnant"
        }
    }

    readServingSizeInfoTypes() {
        return [
            "Tablet",
            "Capsule",
            "Veggie Capsule",
            "Gram",
            "Packet"
        ]
    }

    readAllergens() {
        return [
            "Milk",
            "Eggs",
            "Peanuts",
            "Tree nuts",
            "Fish",
            "Shellfish",
            "Soy",
            "Wheat"
        ]
    }
}