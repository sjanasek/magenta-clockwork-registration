const state = {
    visitor: null
};

const getters = {
    getVisitor: state => state.visitor
};

const actions = {
    async updateVisitor({ commit }, visitor) {
        const token = sessionStorage.getItem("token");
        const bearerHeader = "Bearer " + token;
        try {
            fetch('/api/update/' + visitor.user_hash_id, {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": bearerHeader
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify(visitor)
            })
                .then(response => response.json())
                // eslint-disable-next-line
                .then(response => {
                    commit('showList');
                })
                // eslint-disable-next-line
                .catch(err => console.error(err));
        } catch (err) {
            // eslint-disable-next-line
            console.log('Error: ', err);
        }
    },
    async updateVisitorLocally({ commit }, formElementData) {
        commit('setFormData', formElementData);
    },
    async rateVisitor({ commit }, rating) {
        commit('setRating', rating);
    }
};

const mutations = {
    setVisitor: (state, visitor) => {
        state.visitor = visitor;
    },
    setFormData: (state, formData) => {
        state.visitor[Object.keys(formData)[0]] = formData[Object.keys(formData)[0]];
    },
    setRating: (state, rating) => {
        state.visitor.rating = rating;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};