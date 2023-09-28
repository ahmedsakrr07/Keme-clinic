import axios from '@axios';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toast-notification';
const $toast = useToast()

export const useRoleListStore = defineStore('useRoleListStore', {
  actions: {
    // 👉 Fetch roles data
    fetchRoles(params) { return axios.get('/roles/index', { params }) },

    // 👉 Add role
    addRole(roleData) {
      return new Promise((resolve, reject) => {
        axios.post('/roles/create', {
          role: roleData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 fetch single role
    fetchRole(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/roles/show/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    
    // 👉 Fetch permissions data
    
    fetchPermissions() { return axios.get('/permissions/index') },

    // 👉 Delete single role
    deleteRole(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/roles/delete/${id}`).
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
  },
})
