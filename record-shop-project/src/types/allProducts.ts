export interface TrackList {
	'Disc 1 Side A': string[];
	'Disc 1 Side B': string[];
	'Disc 2 Side A'?: string[];
	'Disc 2 Side B'?: string[];
}

export interface QuntityInfo {
	arrivalDate: string;
	color: string;
	maximumPurchaseQuantity: string;
	period: string;
	price: number;
	spec: string;
	trackList: TrackList;
}

export interface AboutItemType {
	id: number;
	quntityInfo: QuntityInfo;
	subTitle: string;
	title: string;
	text: string;
}

export interface ProductType {
	id: number;
	aboutItem: AboutItemType;
	category: string;
	company: string;
	deliveryFee: string;
	imageUrl: string;
	inventory: number;
	name: string;
	pressingYear: string;
	price: number;
	priceOff: boolean;
	productType: string;
	quantityTerms: boolean;
	saving: string;
	usedType: string;
}

export interface AllProductsType
	extends Array<{
		id: string;
		products: ProductType[];
	}> {}
// export type { AllProductsType, ProductType };
