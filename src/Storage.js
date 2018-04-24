const KEY_SAVED_VALUES = 'floswhistle.form.values';

const DEFAULT_VALUES = {
    reporter_type: 'rn',
    facility_type: 'hospital',
    zip: '',
    'shift': 'day'
};

let getSavedValues = () => {
    let sv = localStorage.getItem(KEY_SAVED_VALUES);
    if (sv) {
        try {
            return JSON.parse(sv);
        }
        catch(err) {
            console.log('Error reading from local storage...');
        };
    }
    return DEFAULT_VALUES;
};

let storeValues = (vals) => {
    let str = JSON.stringify(vals);
    localStorage.setItem(KEY_SAVED_VALUES, str);
}

let updateValue = (name, value) => {
    let sv = getSavedValues();
    sv[name] = value;
    storeValues(sv);
};

export default {
    getSavedValues,
    updateValue
}
