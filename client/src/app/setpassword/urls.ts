/*Preeti Singh
22/10/2017*/
import {config} from '../config/app.config';
const port='8000';
const localhost=config.ip;


export default{

	'setPassword' : localhost + "/set_password",
	'warningPage' : localhost + "/warning_page"

}
