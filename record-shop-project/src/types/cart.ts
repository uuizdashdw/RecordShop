// import { AboutItemType } from './allProducts';
import { ProductType } from './allProducts';

// export interface CartItem {
// 	id: number;
// 	imageUrl: string;
// 	name: string;
// 	price: number;
// 	quantity: number;
// 	quantityTerm: boolean;
// 	priceOff?: boolean;
// 	aboutItem?: AboutItemType;
// }
export interface CartItem extends ProductType {
	quantity: number;
}
