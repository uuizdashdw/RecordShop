import ProductLayout from '@/layouts/ProductLayout';

const KoreanPage = () => {
	return (
		<ProductLayout>
			<h1>Korean Page!!</h1>
		</ProductLayout>
	);
};

KoreanPage.getLayout = function getLayout(page) {
	return <KoreanPage>{page}</KoreanPage>;
};

export default KoreanPage;
