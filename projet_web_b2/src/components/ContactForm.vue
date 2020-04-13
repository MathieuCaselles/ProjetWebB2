<template>
    <div class="row center-align">
        <div class="col s6 offset-s3">
            <div class="card blue-grey darken-1">
                <div class="card-content white-text contact" >
                    <span class="card-title">Nous contacter :</span>
                    <div class="row">
                        <p v-if="errors.length">
                            <b>Merci de corriger les erreurs suivante(s):</b>
                            <ul>
                                <li v-for="(error,index) in errors" v-bind:key='index' class="red-text">{{ error }}</li>
                            </ul>
                        </p>
                        <form class="col s12">
                        <div class="row">
                            <div class="input-field col s6">
                                <i class="material-icons prefix">account_circle</i>
                                <input id="name" type="text" class="validate" v-model="message.fullName">
                                <label class="active" for="name">Nom complet :</label>
                            </div>
                            <div class="input-field col s6">
                                <i class="material-icons prefix">mail</i>
                                <input id="email" type="email" v-model="message.mail"/> 
                                <label class="active" for="email">Mail :</label>
                            </div>
                            <div class="input-field col s12 inline">
                                <i class="material-icons prefix">message</i>
                                <textarea id="message" class="materialize-textarea" v-model="message.content"></textarea>
                                <label class="active" for="message">Message :</label>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
                <div class="card-action">
                    <button class="btn waves-effect waves-light" @click="sendMessage">Submit
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { messageRef } from '@/firebase';
export default {
  name: 'Contact',
  data(){
        return{
            message:{
                fullName:"",
                mail: "",
                content: "",
                fullDate: "",
            },
            errors: []
        }
    },
  methods: {
        sendMessage(){
            if(this.checkForm()){
                messageRef.add({fullName: this.message.fullName, mail: this.message.mail, content: this.message.content, fullDate: this.getFullDate()})
                .then(() => {
                this.resetEntries();
                alert("Votre message a bien été envoyé");
                });
                
            }
        },
        getFullDate(){
            let currentDate = new Date();
            return (this.twoDigits(currentDate.getDate()) + "/"
                + this.twoDigits(currentDate.getMonth()+1) + "/"
                + currentDate.getFullYear() + " "
                + this.twoDigits(currentDate.getHours()) + "h"
                + this.twoDigits(currentDate.getMinutes()) + "m"
                + this.twoDigits(currentDate.getSeconds()) + "s");
        },
        twoDigits(n){
            return n > 9 ? "" + n: "0" + n;
        },
        resetEntries(){
            this.message.fullName = ""
            this.message.mail = ""
            this.message.content = ""
        },
        validEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        checkForm() {
            this.errors = [];
            if(!this.message.fullName) this.errors.push("Nom complet requis.");
            if(!this.message.content) this.errors.push("Message requis.");
            if(!this.message.mail) {
            this.errors.push("Email requis.");
            } else if(!this.validEmail(this.message.mail)) {
            this.errors.push("Un email valide est requis.");        
            }
            if(!this.errors.length) return true;
    },
    }
    
    
}
</script>
<style>
textarea {
    height: 20rem !important;
}
.contact {
    height: 99%;
}
</style>    