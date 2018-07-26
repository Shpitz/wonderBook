<template>
    <section class="book-filter">
        <input type="text" v-model="searchStr" class="filter-input" @input="loadBooks">
    </section>
</template>

<script>
import {BOOKS_FILTER, UPDATE_SEARCH_FILTER, LOAD_BOOKS} from "../store/book-module.js";
export default {
    computed:{
        filter() {
            return this.$store.getters[BOOKS_FILTER]
        },
        searchStr: {
            get: function () {
                return this.filter.byTxt
            },
            set: function (searchStr) {
                this.$store.commit({ type: UPDATE_SEARCH_FILTER, searchStr })
            }
        }
    },
    methods: {
        loadBooks(){
            this.$store.dispatch(LOAD_BOOKS)
        }
    }
}
</script>

<style>

</style>
