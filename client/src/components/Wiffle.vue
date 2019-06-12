<template>
  <div class="wiffle col-12 col-md-4">
    <div class="card">
      <div class="card-header d-flex justify-content-end">
        <div class="w-75 d-flex justify-content-between">
          <h5>{{wiffle.createdAt | formatTime}}</h5>
          <button class="btn btn-danger v-hidden" @click="deleteWiffle(wiffle._id)">X</button>
        </div>
      </div>
      <div class="card-body">
        <p>{{wiffle.content}}</p>
        <p>-{{wiffle.creator}}</p>
        <p v-if="!addComment" @click="addComment = true"><em>Add Comment</em></p>
        <form @submit.prevent="submitComment" v-else>
            <input required type="text" v-model="newComment.creator" placeholder="name">
            <select v-model="newComment.content">
                <option value="mHmmm">mHmmm</option>
                <option value="Nice Nice">Nice Nice</option>
                <option value="Alright, Thanks">Alright, Thanks</option>
            </select>
            <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-info">Submit</button>
                <button @click="addComment = false" type="button" class="btn btn-danger">X</button>
            </div>    
        </form>
        <div v-if="comments.length">
            <hr />
            <div class="d-flex" v-for="comment in comments" :key="comment._id">
                <h5>{{comment.creator}}</h5>
                <p>{{comment.content}}</p>
                <hr />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";

export default {
  name: "wiffle",
  mounted(){
      this.$store.dispatch('getComments', this.wiffle._id)
  },
  props: ["wiffle"],
  data() {
    return {
        addComment: false,
        newComment: {
            creator: '',
            content: 'mHmmm'
        }
    };
  },
  computed: {
      comments() {
          return this.$store.state.comments[this.wiffle._id] || []
      }
  },
  methods: {
    deleteWiffle(id) {
      this.$store.dispatch("deleteWiffle", id);
    },
    submitComment({target: form}) {
        // add the wiffle Id to the the payload that we'll send
        let comment = {...this.newComment, wiffleId: this.wiffle._id }
        // send the values to the server
        this.$store.dispatch('addComment', comment)
        form.reset()
    }
  },
  filters: {
    formatTime(date) {
      return Moment(String(date)).fromNow();
    }
  },
  components: {}
};
</script>

<style>
.v-hidden {
  visibility: hidden;
}
.card-header:hover .btn.btn-danger {
  visibility: visible;
}
</style>
