import axios from '@axios'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()

export const useTeamListStore = defineStore('useTeamListStore', {
  actions: {
    // 👉 Fetch Teams data
    fetchRoles() { return axios.get('/roles/index') },

    // 👉 Fetch Teams data
    fetchTeams(params) { return axios.get('/team/index', { params }) },
    fetchClinics() { return axios.get('/clinics/index') },


    // 👉 Add Team
    addTeam(data) {axios.post('/team/create', { data })},

    // 👉 fetch single Team
    fetchTeam(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/team/show/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete single Team
    deleteTeam(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/team/delete/${id}`).
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

    // 👉 Status single Team
    ChangeTeamStatus(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/team/status/${id}`).
          then(r => {
            const { message,data,status_code } = r.data
            if(status_code == 200)
              $toast.success(message, { position: 'top-right' })
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
