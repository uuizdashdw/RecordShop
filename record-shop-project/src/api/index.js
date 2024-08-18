import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:4000',
});

// 전체 상품 조회 함수
const fetchAllProducts = () => {
	return instance.get('products');
};

export { fetchAllProducts };
