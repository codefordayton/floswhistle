
const DATA_KEY = 'floswhistle.data';

export default {

    load: () => {
        let dataStr = localStorage.get(DATA_KEY);
        return JSON.parse(dataStr);
    },

    save: (data) => {
        let dataStr = JSON.stringify(data);
        localStorage.set(DATA_KEY, dataStr);
    }

};
