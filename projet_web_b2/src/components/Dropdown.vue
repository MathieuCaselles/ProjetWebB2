<template>
  <div class="menu-item btn green" @click="isOpen = !isOpen">
    <a class="white-text">{{ titleDropDown }}</a>
    <div class="sub-menu" v-if="isOpen">
      <div v-for="(item) in items" :key="item.id" class="menu-item">
        <a @click="getValue(items[item.id])" class="white-text">{{ item.data.nom }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dropdown",
  props: {
    titleDropDown: String,
    items: {}
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    getValue(item) {
      this.$parent.dropdownFunction(item);
    }
  }
};
</script>

<style>
.menu-item .sub-menu {
  z-index: 2;
  background-color: rgb(76, 175, 80);
  position: absolute;
  transform: translateX(-10%);
  width: max max-content;
  border-radius: 0px 0px 16px 16px;
}
</style>