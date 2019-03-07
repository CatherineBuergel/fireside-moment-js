<template>
   <div class="wiffle-form row">
        <div class="col-10 offset-1">
            <h5 class="action" @click="create = !create">{{!create ? 'Post a Wiffle' : 'Cancel'}}</h5>
            <form @submit.prevent="post" v-if="create" class="d-flex flex-column">
                <input placeholder="What's your Name?" type="text" required v-model="wiffle.creator">
                <textarea required placeholder="What I Feel Like Expressing..." v-model="wiffle.content" cols="20" rows="5"></textarea>
                <button type="submit" class="btn btn-info">Submit</button>
            </form>
      </div>
   </div>
</template>

<script>
export default {
   name: "wiffle-form",
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
   computed: {},
   methods: {
       post() {
           this.$store.dispatch('postWiffle', this.wiffle)
           this.create = false
           this.wiffle = {creator: '', content: ''}
       }
   },
   components: {}
}
</script>