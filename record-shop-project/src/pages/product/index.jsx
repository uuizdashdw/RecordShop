import ProductLayout from '@/layouts/ProductLayout';

const ProductPage = () => {
	return (
		<ProductLayout>
			<h1>Product Page</h1>
		</ProductLayout>
	);
};

ProductPage.getLayout = function getLayout(page) {
	return <ProductPage>{page}</ProductPage>;
};

export default ProductPage;
