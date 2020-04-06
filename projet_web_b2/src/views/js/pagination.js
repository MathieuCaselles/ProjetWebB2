Vue.component('pagination-boutique', {
  template: '<li>This is a todo</li>'
})

new Vue({
  el: '#app',
  created() {
    this.paginate_total = this.heroes.length / this.paginate;
  },
  data: {
    current: 1,
    heroes: [
      { name: 'Wolverine', universe: 'Marvel' },
      { name: 'Batman', universe: 'DC' },
      { name: 'Beast', universe: 'Marvel' },
      { name: 'Superman', universe: 'DC' },
      { name: 'Wonder Woman', universe: 'DC' },
      { name: 'Iceman', universe: 'Marvel' },
      { name: 'Black Panther', universe: 'Marvel' },
      { name: 'Beast Boy', universe: 'DC' },
      { name: 'Captain America', universe: 'Marvel' },
      { name: 'Hawkgirl', universe: 'DC' },
      { name: 'Cyclops', universe: 'Marvel' },
      { name: 'Green Lantern', universe: 'DC' },
      { name: 'Thor', universe: 'Marvel' },
      { name: 'Flash', universe: 'DC' },
      { name: 'Spider-man', universe: 'Marvel' },
      { name: 'Martian Manhunter', universe: 'DC' },
      { name: 'Nightwing', universe: 'DC' },
      { name: 'Raven', universe: 'DC' },
      { name: 'Hulk', universe: 'Marvel' },
      { name: 'Shehulk', universe: 'Marvel' }
    ],
    paginate: 3,
    paginate_total: 0,
    default: "waves-effect"
  },
  ready() {
    document.getElementById(this.current).className = "active";
  },
  methods: {
    setPaginate: function (i) {
      if (this.current == 1) {
        return i < this.paginate;
      }
      else {
        return (i >= (this.paginate * (this.current - 1)) && i < (this.current * this.paginate));
      }
    },
    updateCurrent: function (i) {
      document.getElementById(this.current).className = "default";
      this.current = i;
      document.getElementById(i).className = "active";
    },
  }
});