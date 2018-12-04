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
  </div>
</template>

<script>
import { SendMessage } from "../utils/data";

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
      console.log(files);
      this.filename = files[0]["name"];
      this.reader.readAsDataURL(files[0]);

      this.reader.onload = function(e) {
        //读取完毕后调用接口
        let imgFile = e.target.result;
        let obj = {
          id: "loginLogo",
          configGroup: "logo",
          configItem: "loginLogo",
          itemValue: imgFile
        };
        console.log(imgFile);
      };
    }
  }
};
</script>
