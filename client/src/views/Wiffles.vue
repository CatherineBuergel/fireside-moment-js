<template>
   <div class="wiffles container-fluid">
      <div class="row justify-content-center">
         <img src="https://bakingamoment.com/wp-content/uploads/2018/07/IMG_9117-fluffy-buttermilk-waffles-from-scratch-horizontal.jpg" :height="$mq | mq({xs: '150px', sm: '200px', md: '250px', lg: '300px'})">
      </div>
      <div class="row"> <!-- Wiffle Form -->
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
         <wiffle-card v-for="wiffle in wiffles" :key="wiffle._id" :wiffle="wiffle" />
      </div>
   </div>
</template>

<script>
import WiffleCard from '@/components/Wiffle.vue'

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
   methods: {
      post() {
           this.$store.dispatch('postWiffle', {...this.wiffle})
           this.create = false
           this.wiffle = {creator: '', content: ''}
       }
   },
   components: { WiffleCard }
}
</script>