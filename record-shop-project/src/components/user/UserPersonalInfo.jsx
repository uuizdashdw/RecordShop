// CSS
import styles from './userPersonalInfo.module.css';

const UserPersonalInfo = ({ userInfo }) => {

    return (
        <div className={styles.user_wrapper}>
            <div>
                <label htmlFor="" className={styles.label}>
                    이름
                </label>
                <input
                    type="text"
                    className={styles.input}
                    value={userInfo.userName}
                    readOnly
                />
            </div>
            <div>
                <label htmlFor="" className={styles.label}>
                    성별
                </label>
                <input
                    type="text"
                    className={styles.input}
                    value={userInfo.userGender === 'M' ? '남성' : '여성'}
                    readOnly
                />
            </div>
            <div>
                <label htmlFor="" className={styles.label}>
                    전화번호
                </label>
                <input
                    type="text"
                    className={styles.input}
                    value={userInfo.userPhoneNumber}
                    readOnly
                />
            </div>
            <div>
                <label htmlFor="" className={styles.label}>
                    우편번호
                </label>
                <input
                    type="text"
                    className={styles.input}
                    value={userInfo.zonecode}
                    readOnly
                />
            </div>
            <div>
                <label htmlFor="" className={styles.label}>
                    주소
                </label>
                <input
                    type="text"
                    className={styles.input}
                    value={userInfo.userAddress}
                    readOnly
                />
            </div>
            <div>
                <label htmlFor="" className={styles.label}>
                    상세주소
                </label>
                <input
                    type="text"
                    className={styles.input}
                    value={userInfo.userDetailAddress}
                    readOnly
                />
            </div>
        </div>
    )
}

export default UserPersonalInfo;