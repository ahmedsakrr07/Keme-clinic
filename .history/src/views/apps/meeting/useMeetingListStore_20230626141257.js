import axios from '@axios'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()

export const useMeetingListStore = defineStore('useMeetingListStore', {
  actions: {
    // 👉 Fetch oteotes data
    fetchRoles() { return axios.get('/roles/index') },
   
    fetchDoctors() { return axios.get('/doctor/index') },
    fetchPatients() { return axios.get('/patient/index') },
    fetchMeetings(params) { return axios.get('/
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    meeting/index', { params }) },


    // 👉 Add Meeting
    addMeeting(data) {axios.post('/meeting/create/${id}', {data})},


    // 👉 Delete single Meeting
    deleteMeeting(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/meeting/delete/${id}`).
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
