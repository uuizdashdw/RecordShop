// CSS
import styles from './loading.module.css';

const Loading = ({ reason }: any) => {
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
