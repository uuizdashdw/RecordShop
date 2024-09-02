// Firebase
import { db } from '../../../lib/firebase';
import {
	collection,
	getDocs,
	getDoc,
	doc,
	query,
	where,
} from 'firebase/firestore';

import axios from 'axios';
import { notFound } from 'next/navigation';

const instance = axios.create({
	baseURL: 'http://localhost:3000/api',
});

// 전체 상품 조회 함수
const fetchAllProducts = async () => {
	let products = [];
	try {
		const productsCollection = collection(db, 'products');
		const productsSnapshot = await getDocs(productsCollection);
		products = productsSnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}));
	} catch (reason) {
		console.error('데이터를 가져오는 데 실패했습니다.', reason);
	}

	if (!products) products = [];
	return products;
};

// 각 상품 상세 페이지 조회 함수
const fetchProductDetails = async params => {
	const { category, productId } = params;

	try {
		const productDocRef = doc(db, 'products', category);
		const productDoc = await getDoc(productDocRef);

		// 문서 존재 확인
		if (!productDoc.exists()) {
			console.log('카테고리 문서가 존재하지 않습니다.');
		}

		const data = productDoc.data();

		const product = data.products.find(p => Number(p.id) === Number(productId));
		console.log('### 상품 확인 ### ==> ', product);

		return product ? product : { notFound: true };
	} catch (reason) {
		console.error('데이터를 가져오는 데 실패했습니다.', reason);
		return { notFound: true };
	}
};

// 특정 카테고리 상품 조회 함수 모듈
const fetchCategoryIdProducts = async categoryId => {
	let categoryProducts = [];
	try {
		const productDocRef = doc(db, 'products', categoryId);
		const productDoc = await getDoc(productDocRef);

		if (productDoc.exists()) {
			const data = productDoc.data();
			if (data.products) categoryProducts = data.products;
		}
	} catch (reason) {
		console.error('데이터를 가져오는데 실패 했습니다.', reason);
	}

	return categoryProducts;
};

// 한국 상품 조회 함수
const fetchKoreanProducts = async () => {
	return await fetchCategoryIdProducts('korean');
};

// 힙합 , 알앤비 상품 조회 함수
const fetchHiphopRnbProducts = async () => {
	return await fetchCategoryIdProducts('hiphop&rnb');
};

// 비트, 인스트루멘탈 상품 조회 함수
const fetchBeatsAndInstrumentalProdcuts = async () => {
	return await fetchCategoryIdProducts('beats&instrumental');
};

// 재즈 상품 조회 함수
const fetchJazzProducts = async () => {
	return await fetchCategoryIdProducts('jazz');
};

// 뉴 디스코, 모던 펑크 상품 조회 함수
const fetchNuDiscoModernFunkProducts = async () => {
	return await fetchCategoryIdProducts('nu_disco&modern_funk');
};

// 소울, 펑크, 디스코 상품 조회 함수
const fetchSoulFunkDiscoProducts = async () => {
	return fetchCategoryIdProducts('soul&funk&disco');
};

// 락, 팝 상품 조회 함수
const fetchRockPopProducts = async () => {
	return await fetchCategoryIdProducts('rock&pop');
};

// 사운드트랙 상품 조회 함수
const fetchSoundtrackProducts = async () => {
	return await fetchCategoryIdProducts('soundtrack');
};

// 회원가입 함수
const fetchUserSignUp = userData => {
	return instance.post('/users', userData);
};

// 전체 회원 정보 가져오기 함수
const fetchGetUserList = () => {
	return instance.get('/users');
};

// 특정 회원 정보 가져오기 함수
const fetchTargetUserInfo = async id => {
	const { data } = await instance.get('/users');

	if (Array.isArray(data)) {
		const user = data.find(user => user.id === Number(id));
		return user;
	}
};

export {
	fetchAllProducts,
	fetchProductDetails,
	fetchKoreanProducts,
	fetchHiphopRnbProducts,
	fetchBeatsAndInstrumentalProdcuts,
	fetchJazzProducts,
	fetchNuDiscoModernFunkProducts,
	fetchSoulFunkDiscoProducts,
	fetchRockPopProducts,
	fetchSoundtrackProducts,
	fetchUserSignUp,
	fetchGetUserList,
	fetchTargetUserInfo,
};
