<template>
    <section class="book-filter-categories">
        <div @click="setCategorie('Family')">
            Family
        </div>
    </section>
</template>

<script>

export default {
    // props:{
    //     categories:Array
    // },
  data() {
    return {
      filterBy: {
        byCategorie: ""
      }
    }
  },
  mounted() {
    // var filter = this.$store.getters[BOOKS_FILTER];
    // this.filterBy.byCategories = filter.byCategories;
  },
  methods:{
     setCategorie(categorie){
         debugger
        //  this.filterBy.byCategorie = categorie;
        //  this.$emit('searchCategorie',filterBy)
     }
  }
}
</script>