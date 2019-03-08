<template>
   <div class="wiffles container-fluid">
      <wiffle-form />
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
import WiffleForm from '@/components/WiffleForm.vue'
export default {
   name: "wiffles",
   props: [],
   data() {
      return {}
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
   methods: {},
   components: {
      WiffleForm
   }
}
</script>
