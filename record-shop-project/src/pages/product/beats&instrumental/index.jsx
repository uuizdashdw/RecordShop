import ProductLayout from '@/layouts/ProductLayout';

const BeatsAndInstrumentalPage = () => {
	return (
		<ProductLayout>
			<h1>Beats, Instrumental !!</h1>
		</ProductLayout>
	);
};

BeatsAndInstrumentalPage.getLayout = function getLayout(page) {
	return <BeatsAndInstrumentalPage>{page}</BeatsAndInstrumentalPage>;
};

export default BeatsAndInstrumentalPage;
