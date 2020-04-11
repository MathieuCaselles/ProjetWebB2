<template>
  <div class="menu-item btn green" @click="isOpen = !isOpen">
    <a>{{ titleDropDown }}</a>
    <div class="sub-menu" v-if="isOpen">
      <div v-for="(item, index) in items" :key="index" class="menu-item">
        <a @click="getValue(item.title, index)">{{ item.title }}</a>
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
    getValue(itemTitle, index) {
      this.$parent.dropdownFunction(itemTitle, index);
    }
  }
};
</script>

<style>
.menu-item .sub-menu {
  z-index: 2;
  background-color: rgb(76, 175, 80);
  position: absolute;
  transform: translateX(-20%);
  width: max max-content;
  border-radius: 0px 0px 16px 16px;
}
</style>