import axios from 'axios';
import { notFound } from 'next/navigation';

const instance = axios.create({
	baseURL: 'http://localhost:4000',
});

// 전체 상품 조회 함수
const fetchAllProducts = () => {
	return instance.get('/products');
};

// 각 상품 상세 페이지 조회 함수
const fetchProductDetails = async params => {
	const { data } = await instance.get('/products');
	const { category, productId } = params;

	const products = data[category];

	if (!products) return { notFound: true };

	const product = products.find(p => p.id === Number(productId));

	return product ? product : { notFound: true };
};

// 한국 상품 조회 함수
const fetchKoreanProducts = async () => {
	const { data } = await instance.get('/products');
	return data.korean;
};

// 힙합 , 알앤비 상품 조회 함수
const fetchHiphopRnbProducts = async () => {
	const { data } = await instance.get('/products');
	return data['hiphop&rnb'];
};

// 비트, 인스트루멘탈 상품 조회 함수
const fetchBeatsAndInstrumentalProdcuts = async () => {
	const { data } = await instance.get('/products');
	return data['beats&instrumental'];
};

// 재즈 상품 조회 함수
const fetchJazzProducts = async () => {
	const { data } = await instance.get('/products');
	return data.jazz;
};

// 뉴 디스코, 모던 펑크 상품 조회 함수
const fetchNuDiscoModernFunkProducts = async () => {
	const { data } = await instance.get('/products');
	return data['nu_disco&modern_funk'];
};

// 소울, 펑크, 디스코 상품 조회 함수
const fetchSoulFUnkDiscoProducts = async () => {
	const { data } = await instance.get('/products');
	return data['soul&funk&disco'];
};

// 락, 팝 상품 조회 함수
const fetchRockPopProducts = async () => {
	const { data } = await instance.get('/products');
	return data['rock&pop'];
};

// 사운드트랙 상품 조회 함수
const fetchSoundtrackProducts = async () => {
	const { data } = await instance.get('/products');
	return data.soundtrack;
};

// 장바구니 담기 함수
const fetchProductPutInCart = product => {
	return instance.post('/carts', product);
};

// 장바구니 정보 가져오기 함수
const fetchProductsInCart = () => {
	return instance.get('/carts');
};

export {
	fetchAllProducts,
	fetchProductDetails,
	fetchKoreanProducts,
	fetchHiphopRnbProducts,
	fetchBeatsAndInstrumentalProdcuts,
	fetchJazzProducts,
	fetchNuDiscoModernFunkProducts,
	fetchSoulFUnkDiscoProducts,
	fetchRockPopProducts,
	fetchSoundtrackProducts,
	fetchProductPutInCart,
	fetchProductsInCart,
};
