import { Theme } from '@ant-design/cssinjs';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Moon, SunOne } from '@icon-park/react';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import { useModel } from 'umi';

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
  const { initialState, setInitialState } = useModel('@@initialState');

  return (
    <div
      style={{
        display: 'flex',
        height: 56,
        lineHeight: '56px',
      }}
      onClick={() => {
        let theme = 'realDark';
        if (initialState?.settings.navTheme === 'realDark') {
          theme = 'light';
        }
        localStorage.setItem("mouse_theme", theme)
        setInitialState({
          ...initialState,
          settings: { ...initialState.settings, navTheme: theme },
        });
      }}
    >
      {initialState?.settings.navTheme === 'light' ? (
        <Moon theme="filled" size={22} fill="#4a4a4a" />
      ) : (
        <SunOne theme="filled" size={22} fill="#f8e71c" />
      )}
    </div>
  );
};
