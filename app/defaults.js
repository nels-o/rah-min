import config from './config.json';

const defaults = {
};


const settings = { ...defaults, ...config };

export { settings };
