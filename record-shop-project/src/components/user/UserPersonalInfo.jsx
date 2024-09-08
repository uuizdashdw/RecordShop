// CSS
import styles from './userPersonalInfo.module.css';

const UserPersonalInfo = ({ 
    userName, 
    userGender, 
    userPhoneNumber, 
    zonecode, 
    userAddress, 
    userDetailAddress 
}) => {

    return (
        <div className={styles.user_wrapper}>
            <div>
                <label htmlFor="" className={styles.label}>
                    이름
                </label>
                <input
                    type="text"
                    className={styles.input}
                    value={userName}
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
                    value={userGender === 'M' ? '남성' : '여성'}
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
                    value={userPhoneNumber}
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
                    value={zonecode}
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
                    value={userAddress}
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
                    value={userDetailAddress}
                    readOnly
                />
            </div>
        </div>
    )
}

export default UserPersonalInfo;