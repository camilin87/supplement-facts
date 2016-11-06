export default class DailyValueIngredientsService {
    all () {
        return [
            {
                name: "Vitamin A",
                unit: "IU",
                values: { adults: 5000, infants: 1500, toddlers: 2500, pregnant: 8000 }
            },
            {
                name: "Vitamin C",
                unit: "mg",
                values: { adults: 60, infants: 0, toddlers: 0, pregnant: 0 }
            },
        ]
    }
}