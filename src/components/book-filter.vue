<template>
    <section class="book-filter">
      <div class="search-bar">
       <input placeholder="Serach a book or author" type="search"
         v-model="filterBy.byTxt" class="filter-input"
         @input="$emit('searchStr',filterBy)">
         <font-awesome-icon :class="{collapsed : !IsInputEmpty }" class="icon" icon="search" /> 
      </div>
         <p v-show="false"> {{filter}}</p>
    </section>
</template>

<script>
import {
  BOOKS_FILTER,
  UPDATE_SEARCH_FILTER,
} from "../store/book-module.js";
export default {
 
  data() {
    return {
      filterBy: {
        byTxt: ""
      }
    };
  },
  computed:{
    filter() {
          var filter =  this.$store.getters[BOOKS_FILTER]
           this.filterBy.byTxt = filter.byTxt;
           return filter
      },
      IsInputEmpty(){
          return this.filterBy.byTxt === '';
      }
  },
  

};
</script>

<style lang="scss" scoped>
$size: 20px;
.icon {
      margin: 0 0 0 -2rem;
}
.search-bar {
  height: auto;
  width: auto;
  display: inline-block;
  box-sizing: border-box;
  
  input {
    height: 44px;
          width: 300px;
    padding: 10px 20px;
    box-sizing: border-box;
    font-size: 18px;
    border: $size/10 solid transparent;
    border-radius: 44px;
    cursor: pointer;
    background-color: transparent;
    transition: all 0.5s ease-out;
    
    color: transparent;
    &::placeholder {
      color: transparent;
    }
    
    &:invalid {
      box-shadow: none;
    }
    
    &:hover {
      border: $size/10 solid #FFF;
      box-shadow: 0 0 $size/10 $size/10 #EEE;
    }
    
    &:focus, &:valid {
      border: $size/10 solid #CCC;
      outline: none;
      cursor: auto;
      background-color: #FFF;
      color: #000;
      
      &::placeholder {
        color: #999;
      }
      
      + .search-icon {
        z-index: 0;
        border-color: #CCC;
        right: 20px;
        
        &:after {
          background-color: #CCC;
        }
      }
    }
  }
}

@media (max-width: 380px) {
  .search-bar {
    input {
      width: 60px;
     
    }
     
  }
    .search-bar {
    input:focus ,input:hover{
         width: 200px;
       }
     
  }
    

}
</style>
