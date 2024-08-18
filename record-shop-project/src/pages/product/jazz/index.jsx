import ProductLayout from '@/layouts/ProductLayout';

const JazzPage = () => {
	return (
		<ProductLayout>
			<h1>Jazz Page!!</h1>
		</ProductLayout>
	);
};

JazzPage.getLayout = function getLayout(page) {
	return <JazzPage>{page}</JazzPage>;
};

export default JazzPage;
