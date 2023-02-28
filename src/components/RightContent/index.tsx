import { QuestionCircleOutlined, HeartOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import { useModel } from 'umi';
import defaultSettings from '../../../config/defaultSettings';

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 4,
      }}
    />
  );
};

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://pro.ant.design/docs/getting-started');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};

export const SwitchTheme = () => {
  const {initialState, setInitialState} = useModel("@@initialState");

  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        let theme = "realDark"
        if (initialState?.settings.navTheme === 'realDark') {
            theme = 'light'
        }
        setInitialState({
          ...initialState,
          settings: {...initialState.settings, navTheme: theme}
        })
      }}
    >
      <HeartOutlined />
    </div>
  );
};
