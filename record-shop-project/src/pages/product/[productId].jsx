import ProductDetailLayout from '@/layouts/ProductDetailLayout';

const ProductDetailPage = () => {
	<ProductDetailLayout>
		<main>Product Detail Page!!</main>
	</ProductDetailLayout>;
};

ProductDetailPage.getLayout = function getLayout(page) {
	return <ProductDetailPage>{page}</ProductDetailPage>;
};

export default ProductDetailPage;
