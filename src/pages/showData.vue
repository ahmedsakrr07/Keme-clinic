<template>
<VDialog v-model="isDialogVisible" max-width="700" :class="{ 'is-active': showModal }">
  <v-card>
    <v-card-title>
      Edit Meeting
    </v-card-title>
    <v-divider  :thickness="2"></v-divider>
    <v-form @submit.prevent="saveChange">
      <div v-if="selectedEvent" v-for="event in events" key="event.id">.
        <v-container>
          <v-row>
        <v-col
                cols="12"
                sm="12"
                style="    margin-top: -63px;"
              >
              <label class="text">start</label>
                <v-select
                  v-model="event.start"
                  :items="starts"
                  required
                >
                {{ event.start }}
              </v-select>
        </v-col>
        <v-col
                cols="12"
                sm="12"
                style="    margin-top: -32px;"
              >
              <label  class="text">end</label>
              <v-select
                  v-model="event.end"
                  :items="starts"
                  required
                >
                {{ event.end }}
              </v-select>
        </v-col>
        <v-col
                cols="12"
                sm="12"
                style="margin-top: -32px;"
              >
                <label  class="text">time</label>
                <v-text-field
                type="date"
                v-model="event.time"
                  required
                >
              </v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                style="    margin-top: -32px;"
              >
                <label  class="text">doctor</label>
                <v-select
                v-model="event.doctor"
                :items="doctors"
              >
              {{ event.doctor }}
            </v-select>
              </v-col>
              <v-col
                cols="12"
                style="    margin-top: -32px;"
              >
                <label  class="text">patient</label>
                <v-text-field
                  required
                >
                {{ event.patient }}
              </v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                style=" margin-top: -32px;"
              >
                <label  class="text">status</label>
                <v-text-field
                  required
                >
                {{ event.status }}
              </v-text-field>
              </v-col>
      </v-row>
        </v-container>
    </div>
      <VCardText class="d-flex justify-end flex-wrap gap-3">
            <VBtn
              variant="tonal"
              color="secondary"
              @click="isDialogVisible = false"
            >
              Close
            </VBtn>
            <!--
              <VBtn @click="isDialogVisible = false">
              Save
              </VBtn> 
            -->
            <VBtn type="submit" @click="isDialogVisible = false">
              {{ $t("saveChange") }}
            </VBtn>
          </VCardText>
    </v-form>
  </v-card>
  </VDialog>
      </template>
<script>
import axios from 'axios'
export default {
data(){
return{
    isDialogVisible: true,
    events: [], // Your event data should be fetched and stored here
      selectedEvent: {},
      starts: [
      "12:00 am",
  "12:30 am",
  "1:00 am",
  "1:30 am",
  "2:00 am",
  "2:30 am",
  "3:00 am",
  "3:30 am",
  "4:00 am",
  "4:30 am",
  "5:00 am",
  "5:30 am",
  "6:00 am",
  "6:30 am",
  "7:00 am",
  "7:30 am",
  "8:00 am",
  "8:30 am",
  "9:00 am",
  "9:30 am",
  "10:00 am",
  "10:30 am",
  "11:00 am",
  "11:30 am",
  "12:00 pm",
  "12:30 pm",
  "1:00 pm",
  "1:30 pm",
  "2:00 pm",
  "2:30 pm",
  "3:00 pm",
  "3:30 pm",
  "4:00 pm",
  "4:30 pm",
  "5:00 pm",
  "5:30 pm",
  "6:00 pm",
  "6:30 pm",
  "7:00 pm",
  "7:30 pm",
  "8:00 pm",
  "8:30 pm",
  "9:00 pm",
  "9:30 pm",
  "10:00 pm",
  "10:30 pm",
  "11:00 pm",
  "11:30 pm",
],
}
},
methods: {
  fetchEvents() {
    const meet = "https://keme.za3bot.com/api/meeting/index"
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5OTBlMjJkNS05MmIwLTRjZjYtYWM2Ni0wNmE1Y2Y0MGI4M2YiLCJqdGkiOiJkMzRhZWY4NzJkZmVkNDY5MWZlOWU4MmY1ZjUwYWU0Y2U4NTYyOTgzYzg0MTc3MDc5M2ZlZTMwOGM0NzAyOWJjMzg1NjM2NjZiYmRlMDI2YyIsImlhdCI6MTY4ODM4NjA1MS43OTQzMzMsIm5iZiI6MTY4ODM4NjA1MS43OTQzMzUsImV4cCI6MTcyMDAwODQ1MS43OTIyOTQsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Rfo_4pGiQf26L9bW-t8N_PQ4-zsosvayPft__ZwwoMgyNIBZxOflwcdoZbuJdPN5TE8DSG6KeU5JfjLRZd316UjNQY7xuH7OfQf2Oe2gjdICR3XFoBUfKE3HVIEBcUI08TL-R-Z4nhuFeW801pwoIDNtSmEdYY6lwLSwFZxuhjesNga126NmCQKZ2TccvOyLMbM2jrwblsU2KDEi7kCm_lg3_0q9yPzx3IY1bMUekZGXpaq8JPtuGODWQksAlcgO3S-zE2nXaqABP0uuYnB7HAVNld7VlmmrC6lltyJmkK2Tgmf4tYz3Bl7FiDSQZnJ97vK7RPE7TnsSMDXfbzKr-pyE_cqUNHo6icuftJRIJUZMKOial16p5fKqS2VaImlcD3biKMAVwU0_BTaknqu2L6mOl_90fdodrl7wmg_39y316t27ZI_j-ngQRCS-UnUbOZga48GkYvQgmYn4pxXmojFPqfRhElwBASItbL_c4sqw88h1iCGbzj7Zzo6wUxQYTgU0PN5_Mi30_aMPykzwCFvO7E83RZ7o-Jrtsdu0gekdcBIwRLNDCx2v7IZSVf5P4B10ykq9IvqyELnNIlMzVmrf0C5GvzUghIcj0wUVAU_48UvIPeMFosEoOfne581GgCnNru36ZVTd6B1KvJZhm3ZNzI_JmIiufQ0B_VzioCc"
      axios
        .get(meet, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.events = response.data.data.data;
        })
  },
  showDialog() {
    this.showModal = true
  },
  closeModal() {
    this.showModal = false
  },
created() {
  this.fetchEvents()
},
}
}
</script>


<style>
.modal {
  display: block;
  position: fixed;
  z-index: 1024;
  background-color: rgba(0, 0, 0, 0.5);
  --bs-modal-width: 650px !important;
}
.text {
    margin-left: 2px;
    color: black;
    padding-bottom: 2px;
    padding-top: 15px;
    font-weight: 600;
}
.v-card .v-card-title {
    line-height: 1.65rem;
    margin-left: 33%;
    padding-top: 22px;
    font-size: 25px;
    color: black;
}
</style>