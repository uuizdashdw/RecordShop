// IMAGE
import Image from 'next/image';

const Logo = () => {
	const url =
		'https://img.freepik.com/premium-vector/vector-illustration-vinyl-record-black_786040-379.jpg?w=996';

	return (
		<div>
			<Image src={url} width={80} height={50} alt="logo"></Image>
		</div>
	);
};

export default Logo;
