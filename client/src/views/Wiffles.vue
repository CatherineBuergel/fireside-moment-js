<template>
   <div class="wiffles container-fluid">
      <div class="row">
         <div class="col-10 offset-1">
            <h5 class="action" @click="create = !create">{{!create ? 'Post a Wiffle' : 'Cancel'}}</h5>
            <form @submit.prevent="post" v-if="create" class="d-flex flex-column">
                <input placeholder="What's your Name?" type="text" required v-model="wiffle.creator">
                <textarea required placeholder="What I Feel Like Expressing..." v-model="wiffle.content" cols="20" rows="5"></textarea>
                <button type="submit" class="btn btn-info">Submit</button>
            </form>
         </div>
      </div>
      <div class="row">
         <div v-for="wiffle in wiffles" :key="wiffle.id" class="col-4">
            <div class="card">
               <div class="card-header">
                  <h5>{{wiffle.createdAt | formatTime}}</h5>
               </div>
               <div class="card-body">
                  <p>{{wiffle.content}}</p>
                  <p>-{{wiffle.creator}}</p>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import Moment from 'moment'
export default {
   name: "wiffles",
   //in-component route guards should only be used on views and not components
   beforeRouteLeave(to, from, next){
      if (this.wiffle.creator) {
         let leave = confirm("Are you sure you want to leave? You have unfinished business.")
         if (!leave) return next(false)
      }
      next()
   },
   props: [],
   data() {
      return {
         create: false,
          wiffle: {
              creator: '',
              content: ''
          }
      }
   },
   computed: {
      wiffles() {
         return this.$store.state.wiffles
      }
   },
   filters: {
      formatTime(date) {
         return Moment(String(date)).fromNow()
      }
   },
   methods: {
      post() {
           this.$store.dispatch('postWiffle', this.wiffle)
           this.create = false
           this.wiffle = {creator: '', content: ''}
       }
   },
   components: { }
}
</script>
