import { ProductType } from '../src/types';

export const initialProdcut: ProductType = {
	id: 0,
	category: '',
	company: '',
	deliveryFee: '',
	imageUrl: '',
	inventory: 0,
	name: '',
	pressingYear: '',
	price: 0,
	priceOff: false,
	productType: '',
	quantityTerms: false,
	saving: '',
	usedType: '',
	aboutItem: {
		id: 0,
		title: '',
		subTitle: '',
		text: '',
		quntityInfo: {
			arrivalDate: '',
			color: '',
			maximumPurchaseQuantity: '',
			period: '',
			price: 0,
			spec: '',
			trackList: {
				'Disc 1 Side A': [],
				'Disc 1 Side B': [],
				'Disc 2 Side A': [],
				'Disc 2 Side B': [],
			},
		},
	},
};
