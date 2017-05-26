<template lang="html">
  <div class="home">
    <h1>เทอมที่ {{index + 1}}</h1>
    <table class="table is-bordered is-striped is-narrow">
  <thead>
    <tr>
      <th>ชื่อวิชา</th>
      <th>เกรด</th>
      <th>หน่วยกิต</th>
      <th>ลบ</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="sub in term.subjects">
      <td>{{sub.name}}</td>
      <td>{{sub.credit}}</td>
      <td>{{sub.grade}}</td>
      <td><button type="button" name="button" @click="removeSubject(sub)">x</button></td>
    </tr>
  </tbody>
</table>
    ชื่อวิชา: <input type="text" name="" value="" v-model="name">
    <b-dropdown v-model:value="grade">
      <button class="button" slot="trigger">
        <span>{{grade}}</span>
      </button>
      <b-dropdown-option :value="'A'">A</b-dropdown-option>
      <b-dropdown-option :value="'B+'">B+</b-dropdown-option>
      <b-dropdown-option :value="'B'">B</b-dropdown-option>
      <b-dropdown-option :value="'C+'">C+</b-dropdown-option>
      <b-dropdown-option :value="'C'">C</b-dropdown-option>
      <b-dropdown-option :value="'D+'">D+</b-dropdown-option>
      <b-dropdown-option :value="'D'">D</b-dropdown-option>
      <b-dropdown-option :value="'F'">F</b-dropdown-option>
    </b-dropdown>
    หน่วยกิต: <input type="number" name="" value="" v-model="credit">
    <a class="button is-primary" @click="addNewSubject(name, grade, credit)">เพิ่มวิชา</a>
    <br>
    เกรดรวมเทอม{{index + 1}}: {{total}}
    <hr>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Term',
  props: ['term', 'index'],
  data () {
    return {
      name: '',
      grade: 'เกรด',
      credit: ''
    }
  },
  computed: {
    ...mapGetters(['']),
    total () {
      let total = 0
      let credit = 0
      this.term.subjects.forEach(i => {
        total += i.pointGrade
        credit += parseInt(i.credit)
      })
      if (isNaN(total / credit)) return ''
      return (total / credit).toFixed(2)
    }
  },
  methods: {
    ...mapActions(['addSubject', 'removeSubject']),
    addNewSubject (name, grade, credit) {
      let pointGrade = 0
      if (grade === 'A') {
        pointGrade = 4 * credit
      }
      if (grade === 'B+') {
        pointGrade = 3.5 * credit
      }
      if (grade === 'B') {
        pointGrade = 3 * credit
      }
      if (grade === 'C+') {
        pointGrade = 2.5 * credit
      }
      if (grade === 'C') {
        pointGrade = 2 * credit
      }
      if (grade === 'D+') {
        pointGrade = 1.5 * credit
      }
      if (grade === 'D') {
        pointGrade = 1 * credit
      }
      if (grade === 'F') {
        pointGrade = 0
      }
      if (this.name === '' || this.credit === '' || this.grade === 'เกรด') {
        return
      }
      this.addSubject({
        name,
        grade,
        credit,
        term: this.term.id,
        pointGrade,
        id: Date.now()
      })
      this.name = ''
      this.grade = 'เกรด'
      this.credit = ''
    }
  }
}
</script>
<style lang="css">
</style>
