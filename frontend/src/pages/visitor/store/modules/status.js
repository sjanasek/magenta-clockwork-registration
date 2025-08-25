import axios from 'axios';

const state = {
    status: false,
    production_States: {
        'waiting to be rated': 0,
        'pending': 1,
        'in progress': 5,
        'finished': 6,
        'picked up by customer': 8,
        'order cancelled': 9
    }
};

const getters = {
    getStatus: state => state.status
};

const actions = {
    setStatus: ({ commit }, status) => commit('mutateStatus', status),
    // eslint-disable-next-line
    fetchStatus: async ({ commit }, id) => {
        const result = await axios.post('/api/status', {
            visitor_hash_id: id
        });
        commit('mutateStatus', result.data);
    }
};

const mutations = {
    mutateStatus: (state, status) => state.status = state.production_States[status]
};

export default {
    state,
    getters,
    actions,
    mutations
};