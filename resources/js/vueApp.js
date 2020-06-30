// Build cost compare widget
var costCompare = new Vue({
	el: '#cost-compare',
	delimiters: ['${', '}'],

	data: {
		tradeType: {
			name: 'Iron Condors',
			optionsPerLot: 4
		},

		tradeTypes: [{
				name: 'Iron Condors',
				optionsPerLot: 4
			},
			{
				name: 'Vertical Spreads',
				optionsPerLot: 2
			},
			{
				name: 'Butterfly Spreads',
				optionsPerLot: 4
			},
			{
				name: 'Single Options',
				optionsPerLot: 1
			},
			{
				name: 'Ratio Spreads',
				optionsPerLot: 3
			},
		],

		tradePerMonth: 20,
		lotSize: 10,
		tradesPerMonth: [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
		lotSizes: [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
		brokers: [

			{
				name: "Ally Invest",
				baseCost: 4.95,
				costPerOption: 0.65,
				minCost: 0,
				platform: false,
				maxPerLeg: 0
			},

			{
				name: "E*Trade",
				baseCost: 6.95,
				costPerOption: 0.75,
				minCost: 0.00,
				platform: false,
				maxPerLeg: 0
			},

			{
				name: "Trade Station",
				baseCost: 5.00,
				costPerOption: 0.50,
				minCost: 0,
				platform: false,
				maxPerLeg: 0
			},

			{
				name: "TD Ameritrade",
				baseCost: 6.95,
				costPerOption: 0.75,
				minCost: 0,
				platform: false,
				maxPerLeg: 0
			},

			// Closing trades are free so we call it .50 per option
			{
				name: "Tastyworks",
				baseCost: 0.00,
				costPerOption: 0.50,
				minCost: 0,
				platform: true,
				maxPerLeg: 5
			},

			{
				name: "Interactive Brokers",
				baseCost: 0,
				costPerOption: 0.70,
				minCost: 0,
				platform: false,
				maxPerLeg: 0
			},
		]
	},

	methods: {

		// Broker cost
		getBrokerCost:  function(broker, fmt) {
			let cost = ((broker.baseCost + (broker.costPerOption * this.lotSize * this.tradeType.optionsPerLot)) * this.tradePerMonth) * 12;

			// Tastyworks has a max cost per leg.
			if (broker.name == "Tastyworks") {
				let maxPrice = ((this.tradeType.optionsPerLot * 10) * this.tradePerMonth) * 12;

				if (cost > maxPrice) {
					cost = maxPrice;
				}
			}

			if (fmt) {
				return Math.round(cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			} else {
				return Math.round(cost);
			}
		},

		// Get total savings
		getSavings: function() {

			let max = 0.00;

			// Get the most expensive.
			for (let i = 0; i < this.brokers.length; i++) {
				let bCost = this.getBrokerCost(this.brokers[i], false);

				if (bCost > max) {
					max = bCost;
				}
			}

			// $600 is the cost of OC for a year.
			return (max - 600).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}


	}

});