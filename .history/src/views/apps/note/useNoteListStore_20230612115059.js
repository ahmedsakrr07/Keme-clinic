import axios from '@axios';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toast-notification';
const $toast = useToast()

export const useNoteListStore = defineStore('useNoteListStore', {
  actions: {
    // 👉 Fetch Notes data
    fetchRoles() { return axios.get('/roles/index') },
    // 👉 Fetch Notes data
    fetchPatients(params) { return axios.get('/patient/index', { params }) },

    // 👉 Add Note
    addNote(data) {axios.post('/note/create', {data})},

    // 👉 fetch single Note
    fetchPatient(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/patient/show/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    // 👉 Delete single Patient
    deletePatient(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/patient/delete/${id}`).
        then(r => {
          const {message,data,status_code} = r.data
          if(status_code == 200)
             $toast.success(data.message, { position: 'top-right'})
             resolve(r)
        }).catch(error => {
              const {message,data,status_code} = error.response.data
              if(status_code != 200)
                $toast.error(message, { position: 'top-right'})
                reject(status_code)
          })
        })
    },
    // 👉 Status single Patient
    ChangePatientStatus(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/patient/status/${id}`).
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
