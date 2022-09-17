import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // STATE IS AN OBJECT SIMILAR TO DATA FUNCTION
  state: {
    todos: [],
    todo: {},
    error: "",
  },

  // GETTERS SIMPLY GET VARS FROM STATE OBJECT AND RENDER IT TO THE HTML
  // TO RENDER IN COMPUTED WRITE: ...mapGetters([ARRAY WITH NAMES OF GETTERS])
  getters: {
    getTodos: (state) => state.todos,
    getTodo: (state) => state.todo,
    getError: (state) => state.error,
  },
  // ACTIONS ARE FUNCTIONS THAT SETS STATES TO THE MUTATIONS, SECOND ARGUMENT IS PARAMETER:THAT WILL BE COMMITED TO THE STATE
  actions: {
    async fetchTodos({ commit }) {
      try {
        let req = await fetch("http://localhost:3000/posts");
        let res = await req.json();
        commit("setTodos", res);
      } catch (err) {
        commit("setError", err.message);
      }
    },
    async fetchTodo({ commit }) {
      let req = await fetch(`http://localhost:3000/posts/${id}`);
      let res = await req.json();
      commit("setTodo", res);
    },
  },

  // MUTATION'S FIRST PARAMETER IS NAME OF VAR IN STATE OBJ, SECOND PARAM IS STATE THAT WILL BE COMMITED TO THE STATE.VARIABLE
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    setTodo(state, todo) {
      state.todo = todo;
    },
    setError: (state, error) => (state.error = error),
  },
});

// state: {
//   posts: [],
//   isLoading: false,
//   post: {},
// },
// getters: {
//   getLoading: (state) => state.isLoading,
//   getPosts: (state) => state.posts,
//   getPost: (state) => state.post,
// },
// mutations: {
//   setPosts(state, posts) {
//     return (state.posts = posts);
//   },
//   setLoading: (state, loading) => (state.isLoading = loading),
//   setPost: (state, post) => (state.post = post),
// },
// actions: {
//   async fetchPosts({ commit }) {
//     commit("setLoading", true);
//     const data = await fetch("http://localhost:3000/posts");
//     const posts = await data.json();
//     commit("setLoading", false);
//     commit("setPosts", posts);
//   },
//   async fetchPost({ commit }, id) {
//     commit("setLoading", true);
//     const data = await fetch(`http://localhost:3000/posts/${id}`);
//     const post = await data.json();
//     commit("setLoading", false);
//     commit("setPost", post);
//   },
// },
