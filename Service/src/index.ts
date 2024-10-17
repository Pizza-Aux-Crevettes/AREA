import { manageArea } from './area/area.service';
require('dotenv').config();

setInterval(async () => {
    await manageArea();
}, 60 * 100);
