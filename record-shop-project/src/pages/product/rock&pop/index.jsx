import ProductLayout from '@/layouts/ProductLayout';

const RockAndPopPage = () => {
	return (
		<ProductLayout>
			<h1>Rock And Pop Page !!</h1>
		</ProductLayout>
	);
};

RockAndPopPage.getLayout = function getLayout(page) {
	return <RockAndPopPage>{page}</RockAndPopPage>;
};

export default RockAndPopPage;
