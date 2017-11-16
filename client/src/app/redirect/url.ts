
import {config} from '../config/app.config';
const port='8000';
const localhost=config.ip;

export const expressUrl={
	'rediectUrl':localhost+'/verify_user/',
}