// CSS
import styles from '../css/periodInfo.module.css';

interface PeriodInfoType {
	period: string;
	arrivalDate: string;
	maximum: string;
}

const PeriodInfo = ({ period, arrivalDate, maximum }: any) => {
	return (
		<div className={styles.key_point_wrapper}>
			{period && <p className={styles.key_point}>* 사전예약 기간 : {period}</p>}
			<p className={styles.key_point}>* 입고 예정일 : {arrivalDate}</p>
			<p className={styles.key_point}>* 1인당 최대 구매수량 : {maximum}</p>
		</div>
	);
};

export default PeriodInfo;
