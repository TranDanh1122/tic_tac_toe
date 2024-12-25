window.storage = {
    save: (key, value) => {
        try {
            const stringValue = JSON.stringify(value);
            localStorage.setItem(key, stringValue);
        } catch (error) {
            console.error("Error saving to localStorage", error);
        }
    },

    get: (key) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error("Error getting data from localStorage", error);
            return null;
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Error removing data from localStorage", error);
        }
    },

};