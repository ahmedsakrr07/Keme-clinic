import axios from '@axios';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toast-notification';
const $toast = useToast()

export const useSpecializationListStore = defineStore('useSpecializationListStore', {
  actions: {
 
    // 👉 Fetch Specializations data
    fetchSpecializations(params) { return axios.get('/specialization/index', { params }) },
    // 👉 Fetch Specializations data For Select
    fetchSpecializationsSelect() { return axios.get('/specialization/select') },

    // 👉 Add specialization
    addSpecialization(data) {axios.post('/specialization/create', {data})},

    // 👉 fetch single Specialization
    fetchSpecialization(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/specialization/show/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    // 👉 Delete single Specialization
    deleteSpecialization(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/specialization/delete/${id}`).
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
    // 👉 Status single Specialization
    ChangeSpecializationStatus(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/specialization/status/${id}`).
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
