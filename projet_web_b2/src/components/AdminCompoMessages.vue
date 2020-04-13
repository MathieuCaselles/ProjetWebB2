<template>
<div>
  <div class="row">
    <div class="col s3 m3" v-for="(message, index) in messages" v-bind:key="index">
      <div class="card green">
        <div class="card-content white-text">
          <span class="card-title center">{{message.data().fullName}}</span>
            <p ><span class="title">Mail :</span> {{message.data().mail}}</p>
            <p><span class="title">Date :</span> {{message.data().fullDate}}</p>
            <label class="card-title white-text">Message : </label>
            <p> {{ message.data().content }} </p>
        </div>
        <div class="card-action">
            <button class="btn waves-effect waves-light red" @click="deleteMessage(message.id)">delete<i class="material-icons right">delete</i></button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import { messagesRef } from "@/firebase";

export default {
    data(){
        return{
            messages: [],
            message: {
                fullName: "",
                mail: "",
                content: "",
                fullDate: ""
            }
        }
    },
    methods:{
    readData() {
      this.messages = [];
      messagesRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.messages.push(doc);
        });
      });
    },
    deleteMessage(doc) {
        messagesRef
          .doc(doc)
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      this.readData();
    },
    },
    created(){
        this.readData();
    }
}
</script>
<style>
.card .card-content {
  height: 300px;
  overflow: auto;
}

.title{
    font-size: 20px;
}
</style>