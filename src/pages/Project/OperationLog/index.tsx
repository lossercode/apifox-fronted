import LogList from "./Components/LogList";
import OperationDetail from "./Components/OpertationDetail";
import styles from "./index.less"
const OperationLog = () => {
    return (<div className={styles['log-container']}>
    <div className={styles['list-container']}>
        <LogList/>
    </div>
    {/* <div className={styles['detail-container']}>
        <OperationDetail/>
    </div> */}
</div>)
}
export default OperationLog;