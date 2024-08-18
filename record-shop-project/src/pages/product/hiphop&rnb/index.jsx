import ProductLayout from '@/layouts/ProductLayout';

const HiphopRnbPage = () => {
	return (
		<ProductLayout>
			<h1>Hiphop & Rnb !!</h1>
		</ProductLayout>
	);
};

HiphopRnbPage.getLayout = function getLayout(page) {
	return <HiphopRnbPage>{page}</HiphopRnbPage>;
};

export default HiphopRnbPage;
