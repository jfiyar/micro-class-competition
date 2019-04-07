import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {LocaleProvider} from 'antd'
import ZH_CN from 'antd/lib/locale-provider/zh_CN'
import Pages from '@/pages/';
import moment from 'moment';
import 'moment/locale/zh-cn';

if (module.hot) {
    module.hot.accept()
}
moment.locale('zh-cn');

ReactDOM.render(
<LocaleProvider locale={ZH_CN}>
    <BrowserRouter>
        <Pages />
    </BrowserRouter>
</LocaleProvider>, document.getElementById('root'));

