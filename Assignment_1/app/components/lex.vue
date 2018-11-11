<template>
    <div>
        <div class="content">
            <div>Test Lex</div>
            <button @click="test">Test</button>
            <input type="text" v-model="input"/> <button @click="type">test lexruntime</button>
        </div>
    </div>    
</template>

<script>
import { testLex, lexRuntime, userName } from "../utils/lex";

export default {
  created(){
      testLex();
      let lexruntime = lexRuntime();
      this.lex = lexruntime;
      this.lexUserId = "DiningBot" + userName();
      this.sessionAttributes = {};
  },
  data() {
    return {
      input: '',
      lex: '',
      lexUserId: ''
    };
  },
  methods: {
    test() {
      testLex();
    },
    type() {
      var params = {
        botAlias: "$LATEST",
        botName: "DiningBot",
        inputText: this.input,
        userId: this.lexUserId,
        sessionAttributes: this.sessionAttributes
      };

      this.lex.postText(params, function(err, data) {
        if (err) {
          console.log(err, err.stack);
          console.log("Error:  " + err.message + " (see console for details)");
        }
        if (data) {
          // capture the sessionAttributes for the next cycle
          this.sessionAttributes = data.sessionAttributes;
          // show response and/or error/dialog status
          console.log(data);
        }
        // re-enable input
      });
    }
  }
};
</script>

