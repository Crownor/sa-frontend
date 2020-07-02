import ajax from './ajax';
import _ from './util';
import moment from 'moment';

moment.locale('zh-cn');

window._ = _;
window.moment = moment;
window.ajax = ajax;