
import axios from '@axios'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()

export const useDoctorListStore = defineStore('useDoctorListStore', {
  actions: {
    // 👉 Fetch Doctors data
    fetchRoles() { return axios.get('/roles/index') },

    // 👉 Fetch specializations data
    fetchSpecializations() { return axios.get('/specialization/index') },

    fetchClinics() { return axios.get('/clinics/index') },
    fetchStaffs() { return axios.get('/staff/index') },
    fetchPatients() { return axios.get('/patient/index') },



    // 👉 Fetch Doctors data
    fetchDoctors(params) { return axios.get('/doctor/index', { params }) },

    // 👉 Fetch Appointments data
    fetchAppointments(params) { return axios.get('/doctor/appointments', { params }) },
    
    // 👉 Add Doctor
    addDoctor(data) {axios.post('/doctor/create', { data })},

    // 👉 fetch single Doctor
    fetchDoctor(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/doctor/show/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    // 👉 Delete single Doctor
    deleteDoctor(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/doctor/delete/${id}`).
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

    // 👉 Delete single Appointments
    deleteAppointments(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/doctor/delete/appointments/${id}`).
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

    

    // 👉 Status single Doctor
    ChangeDoctorStatus(id) {
      return new Promise((resolve, reject) => {
        axios.post(`/doctor/status/${id}`).
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
