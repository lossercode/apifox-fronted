import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { history } from 'umi';
import styles from './index.less';

const ProjectsPage: React.FC = () => {
  const { name } = useModel('global');
  const handleClick = () => {
    history.push('/projects/1');
  };

  return (
    <PageContainer ghost>
      <div className={styles.container} onClick={handleClick}>
        <Guide name={trim(name)} />
      </div>
    </PageContainer>
  );
};

export default ProjectsPage;
