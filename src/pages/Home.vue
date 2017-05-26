<template lang="html">
  <div class="home section">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <br>
        <a class="button is-primary" @click="addNewTerm">เพิ่มเทอม</a>
        <br>
        เกรดเฉลี่ยรวม: {{total}}
        <term v-for="(subject, index) in subjects" :term="subject" :index="index"></term>
      </div>
    </div>
  </div>
</template>

<script>
import Term from '@/components/Term'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      name: '',
      grade: '',
      credit: '',
      term: ''
    }
  },
  components: {
    Term
  },
  computed: {
    ...mapGetters(['subjects']),
    total () {
      let total = 0
      let credit = 0
      this.subjects.forEach(i => {
        i.subjects.forEach(j => {
          total += j.pointGrade
          credit += parseInt(j.credit)
        })
      })
      if (isNaN(total / credit)) return ''
      return (total / credit).toFixed(2)
    }
  },
  methods: {
    ...mapActions(['addTerm']),
    addNewTerm () {
      this.addTerm()
    }
  }
}
</script>
<style lang="css">
</style>
