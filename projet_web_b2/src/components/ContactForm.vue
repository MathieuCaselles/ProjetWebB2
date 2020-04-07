<template>
    <div class="row center-align">
        <div class="col s6 offset-s3">
            <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                    <span class="card-title">Nous contacter :</span>
                    <div class="row">
                        <form class="col s12">
                        <div class="row">
                            <div class="input-field col s6">
                                <i class="material-icons prefix">account_circle</i>
                                <input id="name" type="text" class="validate">
                                <label class="active" for="name">Nom complet :</label>
                            </div>
                            <div class="input-field col s6">
                                <i class="material-icons prefix">mail</i>
                                <input id="mail" type="text">
                                <label class="active" for="mail">Mail :</label>
                            </div>
                            <div class="input-field col s12">
                                <i class="material-icons prefix">message</i>
                                <textarea id="message" class="materialize-textarea"></textarea>
                                <label class="active" for="message">Message :</label>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
                <div class="card-action">
                    <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Contact',
  props: {
  }
}
</script>