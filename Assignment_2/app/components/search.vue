<template>
  <div>
    <p>Search Image</p>
    <input type="text" v-model="keyword">
    <span>
      <button @click="send">Search</button>
    </span>
    <input type="file" name id="inputFile" @change="uploadIMG($event)" style="display:none">
    <span>{{filename}}</span>
    <input type="button" value="Browse" onclick="document.getElementById('inputFile').click()">
    <button @click="testGet">TEST GET</button>
    <button @click="testPUT">TEST PUT</button>
    <img src="https://s3.amazonaws.com/jingyao-photo/Aimer.jpg">
  </div>
</template>

<script>
import { SendMessage } from "../utils/data";
import { GetImage } from "../utils/data";
import { PutImage } from "../utils/data";

export default {
  created() {
    this.reader = new FileReader();
  },
  data() {
    return {
      keyword: "",
      reader: "",
      filename: ""
    };
  },
  methods: {
    send() {
      SendMessage(this.keyword).then(data => {
        console.log(data);
      });
    },
    uploadIMG(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.filename = files[0]["name"];
      // let data = new FormData();
      // data.append(this.filename, files[0]);
      PutImage(files[0]).then(s => {
        console.log(s);
      });
      // this.reader.readAsDataURL(files[0]);
      // this.reader.onload = function(e) {
      //   //读取完毕后调用接口
      //   let imgFile = e.target.result;
      //   console.log(imgFile);
      //   PutImage(imgFile).then(data=>{
      //     console.log(data);
      //   });
      // };
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
