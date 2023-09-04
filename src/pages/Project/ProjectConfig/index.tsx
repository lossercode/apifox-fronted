import { ProCard } from '@ant-design/pro-components';
import ConfigSelect from './Components/ConfigSelect';
import Member from './Components/Configs/Member';

const ProjectConfig = () => {
  return (
    <>
      <ProCard split="vertical">
        <ProCard colSpan="18%">
          <ConfigSelect />
        </ProCard>
        <ProCard>
          <Member />
        </ProCard>
      </ProCard>
    </>
  );
};

export default ProjectConfig;
