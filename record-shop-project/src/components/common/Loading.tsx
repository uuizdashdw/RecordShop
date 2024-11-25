// CSS
import styles from './loading.module.css';

interface LoadingProps {
	reason: string;
}
const Loading = ({ reason }: LoadingProps) => {
	return (
		<div className={styles.loading_wrapper}>
			<h2 className={styles.title}>{reason}</h2>
			<div className={styles.spinner_wrapper}>
				<div className={styles.spinner}></div>
			</div>
		</div>
	);
};

export default Loading;
