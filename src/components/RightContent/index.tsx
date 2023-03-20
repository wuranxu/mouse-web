import {QuestionCircleOutlined} from '@ant-design/icons';
import {SelectLang as UmiSelectLang} from '@umijs/max';
import {useModel} from 'umi';
import IconFont from "@/components/Icon/IconFont";


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
      <QuestionCircleOutlined/>
    </div>
  );
};

export const SwitchTheme = () => {
  const {initialState, setInitialState} = useModel('@@initialState');

  // @ts-ignore
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        let theme = 'realDark';
        if (initialState?.settings.navTheme === 'realDark') {
          theme = 'light';
        }
        localStorage.setItem("mouse_theme", theme)
        setInitialState({
          ...initialState,
          settings: {...initialState.settings, navTheme: theme},
        });
      }}
    >
      {initialState?.settings.navTheme === 'light' ? (
        <IconFont type='icon-moon-copy'/>
        // <Moon theme="filled" size={22} fill="#4a4a4a" />
      ) : (
        <IconFont type='icon-sun-copy'/>
      )}
    </div>
  );
};
