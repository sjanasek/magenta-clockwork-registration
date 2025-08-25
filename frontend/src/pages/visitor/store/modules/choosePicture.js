import axios from 'axios';

const state = {
    pictureInfo: localStorage.pictureInfo || {
        questions: {},
        flower: "/img/flowers/spiro.png",
        done: false
    },
    quiz: true,
};

const getters = {
    quiz: state => state.quiz,
    getQuestions: state => state.pictureInfo.questions,
    getFlower: state => state.pictureInfo.flower,
    getPictureInfo: state => state.pictureInfo
};

const actions = {
    toggleQuiz: ({ commit }, bool) => commit("mutateQuiz", bool),
    setQuestions: ({ commit }, questions) => {
        commit("mutateQuestions", questions);

    },
    fetchFlower: async ({ commit }, answers) => {
        const response = await axios.post("/api/flower",{
            body: answers
        });
        commit("mutateFlower", response.data.src);
    },
    toggleDone: ({commit}) => {
        commit("mutatePictureInfo", true);
    }
};

const mutations = {
    mutateQuiz: (state, bool) => state.quiz = bool,
    mutateQuestions: (state, questions) => state.pictureInfo.questions = questions,
    mutateFlower: (state, flower) => state.pictureInfo.flower = flower,
    mutatePictureInfo: state => state.pictureInfo.done = true
};

export default {
    state,
    getters,
    actions,
    mutations
};