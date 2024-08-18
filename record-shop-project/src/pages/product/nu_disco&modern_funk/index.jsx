import ProductLayout from '@/layouts/ProductLayout';

const NuDiscoAndModernFunkPage = () => {
	return (
		<ProductLayout>
			<h1>NU Disco And Modern Funk !!</h1>
		</ProductLayout>
	);
};

NuDiscoAndModernFunkPage.getLayout = function getLayout(page) {
	return <NuDiscoAndModernFunkPage>{page}</NuDiscoAndModernFunkPage>;
};

export default NuDiscoAndModernFunkPage;
