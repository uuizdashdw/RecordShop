import { AboutItemType } from './allProducts';

export type CartItem = {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
	quantity: number;
	quantityTerm: boolean;
	priceOff?: boolean;
	aboutItem?: AboutItemType;
};
