import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:4000',
});

// 전체 상품 조회 함수
const fetchAllProducts = () => {
	return instance.get('/products');
};

// 한국 상품 조회 함수
const fetchKoreanProducts = async () => {
	const { data } = await instance.get('/products');
	return data.koreanMusic;
};

export { fetchAllProducts, fetchKoreanProducts };
