import { manageArea } from './area/area.service';
require('dotenv').config();
manageArea();
setInterval(async () => {
    await manageArea();
}, 60000);
