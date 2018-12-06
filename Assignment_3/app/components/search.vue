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
    <button @click="startCoversation">Voice Input</button>
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
  created() {
    this.audioControl = new LexAudio.audioControl();
  },
  data() {
    return {
      keyword: "",
      reader: "",
      filename: "",
      photo_list: [],
      success: "",
      conversation: "",
      audioControl: ""
    };
  },
  methods: {
    send() {
      this.photo_list = [];
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
    startCoversation() {
      this.buildCoversation();
      this.conversation.advanceConversation();
    },
    buildCoversation() {
      AWS.config.region = "us-east-1";

      this.conversation = new LexAudio.conversation(
        { lexConfig: { botName: "SearchPhotos" } },
        (state)=> {
          // Called on each state change.
          console.log(state);
        },
        (data)=> {
          // Called with the LexRuntime.PostContent response.
          if (data["message"].indexOf("]") !== -1) {
            let temp = JSON.parse(data["message"]);
            for (let i = 0; i < temp.length; i++) {
              temp[i] = "https://s3.amazonaws.com/jingyao-photo/" + temp[i];
            }
            this.photo_list = temp;
          }
        },
        (error)=> {
          // Called on error.
          console.log(error);
        },
        (timeDomain)=> {
          // Called with audio time domain data (useful for rendering the recorded audio levels).
        }
      );
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
