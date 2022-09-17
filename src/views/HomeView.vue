<template>
  <div class="home">
    <h1>Home page</h1>
    <form @submit.prevent="addItem()">
      <label for="title"></label>
      <input
        v-model="title"
        required
        type="text"
        id="input-name"
        name="title"
        class="input_name"
      />
      <label for="body"></label>
      <input
        v-model="body"
        required
        type="text"
        id="input-body"
        name="body"
        class="input_body"
      />
      <input class="submit" type="submit" value="Add Item" />
    </form>
    <div v-if="getError" class="error">
      {{ getError }}
    </div>
    <div class="posts" v-else>
      <div class="todo" v-for="post in getTodos" :key="post.id">
        <div v-show="post.display" class="editMenu">
          <form @submit.prevent="editItem(post.id)">
            <label for="newtitle"></label>
            <input
              required
              v-model="newTitle"
              type="text"
              name="newtitle"
              id="newtitle"
            />
            <label for="newbody"></label>
            <input
              required
              v-model="newBody"
              type="text"
              name="newbody"
              id="newbody"
            />
            <div style="display: flex; justify-content: space-between">
              <input type="submit" class="menu__btn" value="Save" />
              <button class="menu__btn2" @click="post.display = !post.display">
                Cancel
              </button>
            </div>
          </form>
        </div>
        <h1>{{ post.title }}</h1>
        <p>{{ post.body }}</p>
        <button class="edit" @click="post.display = !post.display">
          Edit Item
        </button>
        <button class="delete" @click="removeItem(post.id)">Delete Item</button>
      </div>
    </div>
    <toast :message="message"> Success </toast>
  </div>
</template>

<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { mapActions, mapGetters } from "vuex";
import Toast from "@/components/Toast.vue";
export default {
  components: { Toast },
  name: "HomeView",
  created() {
    this.fetchTodos();
  },
  data() {
    return {
      newBody: "",
      message: "error",
      newTitle: "",
      modal: this.$vToastify.success("easy-peasy"),
      title: "",
      body: "",
      url: "http://localhost:3000/posts",
    };
  },
  methods: {
    async addItem() {
      let post = {
        display: false,
        title: this.title,
        body: this.body,
        id: uuidv4(),
      };
      try {
        const req = await axios.post(this.url, post);
        window.location.reload();
      } catch (er) {
        alert(er);
      }
    },
    reload() {
      window.location.reload();
    },

    async editItem(id) {
      let item = {
        display: false,
        title: this.newTitle,
        body: this.newBody,
      };
      try {
        let req = await axios.put(this.url + `/${id}`, item);
      } catch (er) {
        alert(er);
      }
      setTimeout(this.reload, 50);
    },

    removeItem(id) {
      try {
        axios.delete(`${this.url}/${id}`);
        setTimeout(this.reload, 50);
      } catch (er) {
        alert(er);
      }
    },
    ...mapActions(["fetchTodos"]),
  },
  computed: {
    ...mapGetters(["getTodo", "getTodos", "getError"]),
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
#newbody,
#newtitle {
  padding: 5px;
  background-color: gray;
  border: none;
  border-radius: 4px;
  color: white;
}
#newbody {
  margin-bottom: 10px;
}
.menu__btn2,
.menu__btn {
  padding: 5px 20px;
  background-color: antiquewhite;
  border: none;
  border-radius: 5px;
  margin: 0px 5px;
  font-size: 16px;
  color: green;
}
.menu__btn2 {
  color: cyan;
  background-color: darkcyan;
}
.editMenu {
  padding: 10px 40px;
  border: none;
  border-radius: 5px;
  background-color: firebrick;
  position: absolute;
  bottom: 100px;
  left: 20px;
}
.edit {
  margin: 0px 10px;
  color: white;
  font-size: 16px;
  padding: 5px 20px;
  border-radius: 5px;
  border: none;
  background-color: darkcyan;
}
.delete {
  font-size: 16px;
  padding: 5px 20px;
  border-radius: 5px;
  border: none;
  background-color: antiquewhite;
}
.view {
  position: fixed;
  top: 0;
  right: 0;
  width: 1920px;
  height: 200px;
}
.modal {
  transition: 10s all;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: -700px;
  width: 450px;
  height: 100px;
  border-radius: 10px;
  background-color: coral;
}
.modal > h1 {
  color: darkcyan;
}
.submit {
  padding: 5px 20px;
  background-color: gold;
  border: none;
  border-radius: 5px;
  color: darkblue;
  font-size: 16px;
}
.posts {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.todo {
  position: relative;
  width: 300px;
  height: 180px;
  margin: 50px 0px;
  padding-bottom: 30px;
  border: 1px solid grey;
  border-radius: 4px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.input_body,
.input_name {
  color: blueviolet;
  border: 1px solid gray;
  outline: none;
  font-size: 18px;
  padding: 3px 100px 3px 10px;
  background-color: antiquewhite;
  border-radius: 8px;
}
.error {
  color: brown;
  font-size: 40px;
}
</style>
