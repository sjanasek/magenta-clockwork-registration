import axios from 'axios';

const state = {
    visitorData: {
        user_hash_id: localStorage.user_hash_id,
        first_name: "",
        last_name: "",
        company: "",
        job_title: "",
        phone: "",
        mail: "",
        answer_one: localStorage.getPictureInfo ? JSON.parse(localStorage.getPictureInfo).questions[0].answer : '',
        answer_two: localStorage.getPictureInfo ? JSON.parse(localStorage.getPictureInfo).questions[1].answer : '',
        answer_three: localStorage.getPictureInfo ? JSON.parse(localStorage.getPictureInfo).questions[2].answer : '',
        business_card: null,
        parameter_excenterLeft: "",
        parameter_excenterRight: "",
        parameter_speedLeft: "",
        parameter_speedRight: "",
        product_type: localStorage.productInfo ? JSON.parse(localStorage.productInfo).reservation.reserved_product : '',
    },
    showOption: undefined,
};

const getters = {
    getVisitorData: state => state.visitorData,
    getOption: state => state.showOption,
};

const actions = {
    updateVisitorData: ({ commit }, data) => commit("mutateVisitorData", data),
    // eslint-disable-next-line
    sendVisitorData: async ({ commit }, data) => {
        try {
            let payload = JSON.parse(JSON.stringify(data.visitor));
            let formData = '';
            if (data.img !== undefined) {
                formData = new FormData();
                formData.append("image", data);
            } else {
                payload.business_card = '';
            }
            await axios.post('/api/createNewVisitor', {
                data: formData,
                visitor: payload
            });
            localStorage.status = 0;
            commit('mutateStatus', 0);
        } catch (err) {
            // eslint-disable-next-line
            console.warn(err);
            return err;
        }
    },
    updateSrc: ({ commit }, src) => {
        commit('mutateSrc', src);
    },
    setOption: ({ commit }, option) => commit("mutateOption", option),

};

const mutations = {
    mutateVisitorData: (state, visitorData) => state.visitorData[[Object.keys(visitorData)[0]]] = visitorData[[Object.keys(visitorData)[0]]],
    mutateOption: (state, option) => state.showOption = option,
    mutateSrc: (state, src) => state.visitorData.business_card = src
};

export default {
    state,
    getters,
    actions,
    mutations
};