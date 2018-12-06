<template>
  <div>
    <p>Image Album</p>
    <input type="text" v-model="keyword">
    <span>
      <button @click="send">Search</button>
    </span>
    <input type="file" name id="inputFile" @change="uploadIMG($event)" style="display:none">
    <input
      type="button"
      value="Upload Image"
      onclick="document.getElementById('inputFile').click()"
    >
    <span>{{filename}}</span>
    <span>{{success}}</span>
    <div>
      <img
        v-for="(item, idx) in photo_list"
        :key="idx"
        :src="item"
        :alt="item"
        style="width:150px;height:150px"
      >
    </div>
  </div>
</template>

<script>
import { SendMessage } from "../utils/data";
import { GetImage } from "../utils/data";
import { PutImage } from "../utils/data";

export default {
  created() {},
  data() {
    return {
      keyword: "",
      reader: "",
      filename: "",
      photo_list: [],
      success: ""
    };
  },
  methods: {
    send() {
      SendMessage(this.keyword).then(data => {
        console.log(data);
        if (Array.isArray(data["data"])) {
          this.photo_list = data["data"];
        }
      });
    },
    uploadIMG(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.filename = files[0]["name"];
      console.log(files[0]);
      PutImage(files[0]).then(data => {
        console.log(data);
        this.filename = "";
        this.success = "upload successfully!";
        setTimeout(() => {
          this.success = "";
        }, 1000);
      });
    },
    testGet() {
      GetImage().then(data => {
        console.log(data);
      });
    },
    testPUT() {
      PutImage().then(data => {
        // console.log(data);
      });
    }
  }
};
</script>
