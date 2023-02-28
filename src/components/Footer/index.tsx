import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '米洛个人出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'mouse',
          title: 'mouse client',
          href: 'https://github.com/wuranxu/mouse-client',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/wuranxu/mouse',
          blankTarget: true,
        },
        {
          key: 'mouse web',
          title: 'mouse web',
          href: 'https://github.com/wuranxu/mouse-web',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
