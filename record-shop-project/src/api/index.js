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

// 힙합 , 알앤비 상품 조회 함수
const fetchHiphopRnbProducts = async () => {
	const { data } = await instance.get('/products');
	return data.hiphopRnb;
};

// 비트, 인스트루멘탈 상품 조회 함수
const fetchBeatsAndInstrumentalProdcuts = async () => {
	const { data } = await instance.get('/products');
	return data.beatsInstrumental;
};

// 재즈 상품 조회 함수
const fetchJazzProducts = async () => {
	const { data } = await instance.get('/products');
	return data.jazz;
};

// 뉴 디스코, 모던 펑크 상품 조회 함수
const fetchNuDiscoModernFunkProducts = async () => {
	const { data } = await instance.get('/products');
	return data.nuDiscoModernFunk;
};

// 소울, 펑크, 디스코 상품 조회 함수
const fetchSoulFUnkDiscoProducts = async () => {
	const { data } = await instance.get('/products');
	return data.soulFunkDisco;
};

// 락, 팝 상품 조회 함수
const fetchRockPopProducts = async () => {
	const { data } = await instance.get('/products');
	return data.rockPop;
};

// 사운드트랙 상품 조회 함수
const fetchSoundtrackProducts = async () => {
	const { data } = await instance.get('/products');
	return data.soundtrack;
};

export {
	fetchAllProducts,
	fetchKoreanProducts,
	fetchHiphopRnbProducts,
	fetchBeatsAndInstrumentalProdcuts,
	fetchJazzProducts,
	fetchNuDiscoModernFunkProducts,
	fetchSoulFUnkDiscoProducts,
	fetchRockPopProducts,
	fetchSoundtrackProducts,
};
