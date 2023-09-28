import axios from '@axios';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toast-notification';
const $toast = useToast()

export const useQuestioneerListStore = defineStore('useQuestioneerListStore', {
  actions: {
 
    // 👉 Fetch SubClinic data
    fetchquestioneer(params) { return axios.get('/subClinic/index', { params }) },

    // 👉 Add subClinic
    addsubClinic(data) {axios.post('/subClinic/create', {data})},

    // 👉 fetch single subClinic
    fetchsubClinic(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/subClinic/show/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    // 👉 Delete single subClinic
    deletesubClinic(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/subClinic/delete/${id}`).
        then(r => {
          const {message,data,status_code} = r.data
          if(status_code == 200)
             $toast.success(message, { position: 'top-right'})
             resolve(r)
        }).catch(error => {
              const {message,data,status_code} = error.response.data
              if(status_code != 200)
                $toast.error(message, { position: 'top-right'})
                reject(status_code)
          })
        })
    },
    // 👉 Status single subClinic
    ChangeSubClinictatus(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/subClinic/status/${id}`).
        then(r => {
          const {message,data,status_code} = r.data
          if(status_code == 200)
             $toast.success(message, { position: 'top-right'})
             resolve(r)
        }).catch(error => {
              const {message,data,status_code} = error.response.data
              if(status_code != 200)
                $toast.error(message, { position: 'top-right'})
                reject(status_code)
          })
        })
    },
  },
})
