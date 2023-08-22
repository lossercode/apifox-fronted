import LogList from "@/pages/Project/OperationLog/Components/LogList";
import OperationDetail from "@/pages/Project/OperationLog/Components/OperationDetail";
import styles from "./index.less"

const OperationLog = () => {
    return (<>
        <div className={styles['log-container']}>
            <div className={styles['list-container']}>
                <LogList/>
            </div>
            <div className={styles['detail-container']}>
                <OperationDetail/>
            </div>
        </div>
    </>)
}
export default OperationLog;