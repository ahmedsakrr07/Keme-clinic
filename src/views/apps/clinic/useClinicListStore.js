import axios from '@axios';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toast-notification';
const $toast = useToast()

export const useClinicListStore = defineStore('useClinicListStore', {
  actions: {
 
    // 👉 Fetch mangers data
    fetchMangers(type) { return axios.get('/team/managers/'+type) },
    
    // 👉 Fetch Clinics data
    fetchClinics(params) { return axios.get('/clinics/index', { params }) },

    // 👉 Fetch Clinics data For Select
    fetchSelectClinic(params) { return axios.get('/clinics/getClinics', { params }) },

    // 👉 Add Clinic
    addClinic(data) {axios.post('/clinics/create', {data})},

    // 👉 fetch single Clinic
    fetchClinic(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/clinics/show/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    // 👉 Delete single Clinic
    deleteClinic(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/clinics/delete/${id}`).
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
    
    // 👉 Status single Clinic
    ChangeClinicStatus(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/clinics/status/${id}`).
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
