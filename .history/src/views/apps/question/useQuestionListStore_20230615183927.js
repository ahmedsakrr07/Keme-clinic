import axios from '@axios'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()

export const useQuestionListStore = defineStore('useQuestionListStore', {
  actions: {
    // 👉 Fetch Questions data
    fetchRoles() { return axios.get('/roles/index') },
   
    fetchDoctors() { return axios.get('/doctor/index') },

    // 👉 Add Question
    addTeam(data) {axios.post('/question/create/${id}', {data})},


    // 👉 fetch single Question
    fetchQuestion(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/question/show/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete single Question
    deleteQuestion(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/Question/delete/${id}`).
          then(r => {
            const { message,data,status_code } = r.data
            if(status_code == 200)
              $toast.success(data.message, { position: 'top-right' })
            resolve(r)
          }).catch(error => {
            const { message,data,status_code } = error.response.data
            if(status_code != 200)
              $toast.error(message, { position: 'top-right' })
            reject(status_code)
          })
      })
    },
    
  },
})
