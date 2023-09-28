<template>
  <div class="settings">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="header d-flex align-center">
            <h2>Settings</h2>
            <VBtn
              v-if="$can('read', 'clinic-setting')"
              :to="{ name: 'settings-TimeZone',action: 'read',subject: 'clinic-setting'}"
              icon
              size="x-small"
              color="info"
              variant="text"
            >
              <VIcon
                size="22"
                icon="tabler-edit"
                :to="{ name: 'settings-TimeZone',action: 'read',subject: 'clinic-setting'}"
              />
            </VBtn>
          </div>
          <div class="timeZone">
            <h1>Defult Timezone</h1>
            <h3>Europe/Minsk</h3>
          </div>
          <div class="Display Hour">
            <h1>Display Hours</h1>
            <h3>1:00 Am - 10:00 Pm</h3>
          </div>
          <div class="increament">
            <h1>Scheduling Increment</h1>
            <h3>10 minutes</h3>
          </div>
          <div class="Duration">
            <h1>Default Appointment Duration</h1>
            <h3>10 minutes</h3>
          </div>
          
          <div class="Background">
            <h1>Default Background Color</h1>
            <span
              class="color-preview"
              :style="{ backgroundColor: selectedColor }"
            ></span>
          </div>
          <div class="text-color">
            <h1>Default Text color</h1>
            <span
              class="color-preview"
              :style="{ backgroundColor: selectedTextColor }"
            ></span>
                    </div>
          <div class="confirm">
            <h1>Meeting Confirmed Status</h1>
            <span
              class="color-preview"
              :style="{ backgroundColor: selectedConfirmedColor }"
            ></span>
                    </div>
          <div class="Pending">
            <h1>Meeting Pending Status</h1>
            <span
              class="color-preview"
              :style="{ backgroundColor: selectedPendingColor }"
            ></span>
                    </div>
          <div class="Canceled">
            <h1>Meeting Canceled Status</h1>
            <span
              class="color-preview"
              :style="{ backgroundColor: selectedCanceledColor }"
            ></span>
                    </div>
        </v-col>
        <v-col cols="6">
          <h1>Default Background Color</h1>
          <v-color-picker
            :swatches="swatches"
            hide-inputs
            show-swatches
            v-model="selectedColor"
              @change="updateBackgroundColor"
           >
          </v-color-picker>
        </v-col>
        <v-col cols="6">
          <h1>Default Text Color</h1>
          <v-color-picker
            :swatches="swatches"
            hide-inputs
            show-swatches
            v-model="selectedTextColor"
              @change="updateBackgroundColor"
           >
          </v-color-picker>
        </v-col>
        <v-col cols="4">
          <h1>Meeting Confirmed Status</h1>
          <v-color-picker
            :swatches="swatches"
            hide-inputs
            show-swatches
            v-model="selectedConfirmedColor"
              @change="updateBackgroundColor"
           >
          </v-color-picker>
        </v-col>
        <v-col cols="4">
          <h1>Meeting Pending Status</h1>
          <v-color-picker
            :swatches="swatches"
            hide-inputs
            show-swatches
            v-model="selectedPendingColor"
              @change="updateBackgroundColor"
           >
          </v-color-picker>
        </v-col>
        <v-col cols="4">
          <h1>Meeting Canceled Status</h1>
          <v-color-picker
            :swatches="swatches"
            hide-inputs
            show-swatches
            v-model="selectedCanceledColor"
              @change="updateBackgroundColor"
           >
          </v-color-picker>
        </v-col>
        <v-divider></v-divider>
        <v-col cols="12">
          <div class="header d-flex align-center">
            <h2>Notifications</h2>
            <svg
              id="_383147_edit_icon"
              data-name="383147_edit_icon"
              xmlns="http://www.w3.org/2000/svg"
              style="padding-bottom: 4px; width: 23px; padding-left: 7px"
              viewBox="0 0 21.917 21.705"
            >
              <rect
                id="Rectangle_354"
                data-name="Rectangle 354"
                width="5.324"
                height="11.133"
                transform="matrix(-0.707, -0.707, 0.707, -0.707, 12.08, 13.667)"
                fill="#7366ed"
              />
              <path
                id="Path_5555"
                data-name="Path 5555"
                d="M39.324,1.866,38.117.659a1.707,1.707,0,0,0-2.414,0l-.847.846L38.621,5.27l.847-.847A1.891,1.891,0,0,0,39.324,1.866Z"
                transform="translate(-17.984 -0.159)"
                fill="#7366ed"
              />
              <path
                id="Path_5556"
                data-name="Path 5556"
                d="M16,22.229V25.99h3.507Z"
                transform="translate(-8.255 -11.546)"
                fill="#7366ed"
              />
              <path
                id="Path_5557"
                data-name="Path 5557"
                d="M14.037,25.037H2.42V13.42H8.5L10.918,11H1.694C.892,11,0,11.408,0,12.21V25.763a1.9,1.9,0,0,0,1.694,1.694H15.247c.8,0,1.21-.893,1.21-1.694V17.1l-2.42,2.42Z"
                transform="translate(0 -5.753)"
                fill="#7366ed"
              />
            </svg>
          </div>
          <div class="mail">
            <h1>New Appointment Mail</h1>
            <h3>this may contain private data please don't share this email</h3>
          </div>
          <div class="Appointment">
            <h1>New Appointment Sms</h1>
            <h3>don't share this email</h3>
          </div>
        </v-col>
        <v-divider inset></v-divider>
        <v-col cols="12">
          <div class="header d-flex align-center">
            <v-icon class="icon" icon="mdi-account"></v-icon>
            <h2>patient profile</h2>
            <svg
              id="_383147_edit_icon"
              data-name="383147_edit_icon"
              xmlns="http://www.w3.org/2000/svg"
              style="padding-bottom: 4px; width: 23px; padding-left: 7px"
              viewBox="0 0 21.917 21.705"
            >
              <rect
                id="Rectangle_354"
                data-name="Rectangle 354"
                width="5.324"
                height="11.133"
                transform="matrix(-0.707, -0.707, 0.707, -0.707, 12.08, 13.667)"
                fill="#7366ed"
              />
              <path
                id="Path_5555"
                data-name="Path 5555"
                d="M39.324,1.866,38.117.659a1.707,1.707,0,0,0-2.414,0l-.847.846L38.621,5.27l.847-.847A1.891,1.891,0,0,0,39.324,1.866Z"
                transform="translate(-17.984 -0.159)"
                fill="#7366ed"
              />
              <path
                id="Path_5556"
                data-name="Path 5556"
                d="M16,22.229V25.99h3.507Z"
                transform="translate(-8.255 -11.546)"
                fill="#7366ed"
              />
              <path
                id="Path_5557"
                data-name="Path 5557"
                d="M14.037,25.037H2.42V13.42H8.5L10.918,11H1.694C.892,11,0,11.408,0,12.21V25.763a1.9,1.9,0,0,0,1.694,1.694H15.247c.8,0,1.21-.893,1.21-1.694V17.1l-2.42,2.42Z"
                transform="translate(0 -5.753)"
                fill="#7366ed"
              />
            </svg>
          </div>
          <div class="required">
            <p>Middle Name</p>
            <p>Name</p>
            <p>Address</p>
            <p>Relationship Status</p>
            <P>Zip Code</P>
          </div>
            <label for="country" style="margin-right: 1em">Country</label>
            <div>
    <v-text-field v-model="location" placeholder="Enter Location" />
    <v-btn @click="searchLocation">Search</v-btn>
    <div v-if="address">
      <p>Address: {{ address }}</p>
    </div>
  </div>
          <!-- <div class="requried-statue">
                        <div class="row">
                        <v-col cols="6">
                        <h2 class="header">Required Patient Fields</h2>
                    </v-col>
                    <v-col cols="6">
                            <div class="statue">
                            <h2 class="header">Statue</h2>
                            </div>
                        </v-col>
                            <div class="text-required">
                                <h1>Data</h1>
                                <v-divider></v-divider>
                            </div>
                            <v-col cols="6">
                            <div class="complate-required">
                                <p>middle name</p>
                                <p>middle name</p>
                                <p>middle name</p>
                                <p>middle name</p>
                                <p>middle name</p>
                            </div>
                            </v-col>

                        <v-col cols="6">
                            <div class="statue">
                            <v-divider></v-divider>
                                <v-switch
                            label="mandatory"
                            color="success"
                            value="success"
                            hide-details
                                ></v-switch>
                                <v-switch
                            v-model="ex11"
                            label="mandatory"
                            color="green"
                            value="success"
                            hide-details
                            ></v-switch>
                            <v-switch
                            v-model="ex11"
                            label="mandatory"
                            color="green"
                            value="success"
                            hide-details
                            ></v-switch>
                            <v-switch
                            v-model="ex11"
                            label="mandatory"
                            color="green"
                            value="success"
                            hide-details
                            ></v-switch>
                            <v-switch
                            v-model="ex11"
                            label="mandatory"
                            color="green"
                            value="success"
                            hide-details
                            ></v-switch>
                            </div>
                        </v-col>
                </div>
                    </div> -->
          <!-- <div class="required statue">
            <v-container>
              <div class="header-text">
                <h1>Required Patient Fields</h1>
              </div>
              <div class="required">
                <v-row>
                  <v-col cols="6">
                    <p>Data</p>
                  </v-col>
                  <v-col cols="6">
                    <p>Statue</p>
                  </v-col>
                </v-row>
              </div>
              <v-divider></v-divider>
              <div class="required-data">
                <v-row>
                  <v-col cols="6">
                    <p>first_name {{ first_name }}</p>
                    <p>middle_name {{ middle_name }}</p>
                    <p>last_name</p>
                    <p>is_send_emails</p>
                    <p>is_leave_voice</p>
                    <p>is_leave_text</p>
                    <p>address1</p>
                    <p>address2</p>
                    <p>city</p>
                    <p>state</p>
                  </v-col>
                  <v-col cols="6">
                    <div class="d-flex" style="margin-top: -4px">
                      <p class="mb-5 mr-5">not mandatory</p>
                      <v-switch color="success" v-model="first_name"></v-switch>
                      <label
                        :class="{
                          'label-on': first_name,
                          'label-off': !first_name,
                        }"
                        >mandatory</label
                      >
                    </div>
                    <div class="d-flex" style="margin-top: -48px">
                      <p class="mb-5 mr-5">not mandatory</p>
                      <v-switch
                        color="success"
                        v-model="middle_name"
                      ></v-switch>
                      <label
                        :class="{
                          'label-on': middle_name,
                          'label-off': !middle_name,
                        }"
                        >mandatory</label
                      >
                    </div>
                    <div class="d-flex" style="margin-top: -48px">
                      <p class="mb-5 mr-5">not mandatory</p>
                      <v-switch color="success" v-model="last_name"></v-switch>
                      <label
                        :class="{
                          'label-on': last_name,
                          'label-off': !last_name,
                        }"
                        >mandatory</label
                      >
                    </div>
                    <div class="d-flex" style="margin-top: -48px">
                      <p class="mb-5 mr-5">not mandatory</p>
                      <v-switch
                        color="success"
                        v-model="is_send_emails"
                      ></v-switch>
                      <label
                        :class="{
                          'label-on': is_send_emails,
                          'label-off': !is_send_emails,
                        }"
                        >mandatory</label
                      >
                    </div>
                    <div class="d-flex" style="margin-top: -48px">
                      <p class="mb-5 mr-5">not mandatory</p>
                      <v-switch
                        color="success"
                        v-model="is_leave_voice"
                      ></v-switch>
                      <label
                        :class="{
                          'label-on': is_leave_voice,
                          'label-off': !is_leave_voice,
                        }"
                        >mandatory</label
                      >
                    </div>
                    <div class="d-flex" style="margin-top: -48px">
                      <p class="mb-5 mr-5">not mandatory</p>
                      <v-switch
                        color="success"
                        v-model="is_leave_text"
                      ></v-switch>
                      <label
                        :class="{
                          'label-on': is_leave_text,
                          'label-off': !is_leave_text,
                        }"
                        >mandatory</label
                      >
                    </div>
                    <div class="d-flex" style="margin-top: -48px">
                      <p class="mb-5 mr-5">not mandatory</p>
                      <v-switch color="success" v-model="address1"></v-switch>
                      <label
                        :class="{
                          'label-on': address1,
                          'label-off': !address1,
                        }"
                        >mandatory</label
                      >
                    </div>
                    <div class="d-flex" style="margin-top: -48px">
                      <p class="mb-5 mr-5">not mandatory</p>
                      <v-switch color="success" v-model="address2"></v-switch>
                      <label
                        :class="{
                          'label-on': address2,
                          'label-off': !address2,
                        }"
                        >mandatory</label
                      >
                    </div>
                    <div class="d-flex" style="margin-top: -48px">
                      <p class="mb-5 mr-5">not mandatory</p>
                      <v-switch color="success" v-model="city"></v-switch>
                      <label :class="{ 'label-on': city, 'label-off': !city }"
                        >mandatory</label
                      >
                    </div>
                    <div class="d-flex" style="margin-top: -48px">
                      <p class="mb-5 mr-5">not mandatory</p>
                      <v-switch color="success" v-model="state"></v-switch>
                      <label :class="{ 'label-on': state, 'label-off': !state }"
                        >mandatory</label
                      >
                    </div>
                  </v-col>
                </v-row>
              </div>
              <v-btn class="btn">save</v-btn>
            </v-container>
          </div> -->
        </v-col>
      </v-row>
    </v-container>
    <!-- <div>
    <v-select
      v-model="selectedState"
      :items="stateOptions"
      label="name"
      @input="getAddress"
    ></v-select>
    <div v-if="stateAddress">
      <p>Selected State: {{ selectedState }}</p>
      <p>Address: {{ stateAddress }}</p>
    </div>
  </div> -->

    <!-- <div class="required-data">
                                    <v-row>
                                    <v-col cols="6">
                                        <p>Middle name</p>
                                        <p>Address</p>
                                        <p>City</p>
                                        <p>State</p>
                                        <p>Zip Code</p>
                                    </v-col>
                                    <v-col cols="6">
                                        <div class="d-flex" style="margin-top: -2px;">
                                            <p class="mb-5 mr-5">not mandatory</p>
                                        <v-switch color="success" label="mandatory"></v-switch>
                                        </div>
                                        <div class="d-flex" style="margin-top: -48px;">
                                            <p class="mb-5 mr-5">not mandatory</p>
                                        <v-switch color="success" label="mandatory"></v-switch>
                                        </div>
                                        <div class="d-flex" style="margin-top: -48px;">
                                            <p class="mb-5 mr-5">not mandatory</p>
                                        <v-switch color="success" label="mandatory"></v-switch>
                                        </div>
                                        <div class="d-flex" style="margin-top: -48px;">
                                            <p class="mb-5 mr-5">not mandatory</p>
                                        <v-switch color="success" label="mandatory"></v-switch>
                                        </div>  
                                        <div class="d-flex" style="margin-top: -48px;">
                                            <p class="mb-5 mr-5">not mandatory</p>
                                        <v-switch color="success" label="mandatory"></v-switch>
                                        </div>                                      
                                    </v-col>
                            </v-row>
                                </div> -->
    <!-- <div>
    <v-autocomplete
      v-model="selectedTimezone"
      :items="americanTimezones"
      label="Select Timezone"
      @change="updateTimezone"
    ></v-autocomplete>
    <p>Selected Timezone: {{ selectedTimezone }}</p>
  </div> -->
    <!-- <div>
      <v-select
        v-model="selectedAddress"
        :options="addressOptions"
        label="address"
        @search="searchAddresses"
      ></v-select>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      location: '',
      address: '',
      swatches: [
        ["#7366ED", "#AA0000", "#550000"],
        ["#FFFF00", "#AAAA00", "#555500"],
        ["#00FF00", "#00AA00", "#005500"],
        ["#00FFFF", "#00AAAA", "#005555"],
        ["#0000FF", "#0000AA", "#000055"],
      ],
      selectedColor: "#7366ED",
      selectedTextColor: "#000000",
      selectedConfirmedColor: "#00A70B",
      selectedPendingColor: "#B0C80A",
      selectedCanceledColor: "#FE0000",

    };
  },
  // mounted() {
  //   // Initialize the Autocomplete service
  //   this.autocomplete = new google.maps.places.Autocomplete(
  //     this.$refs.autocompleteInput,
  //     { types: ['(regions)'] }
  //   );
  // },

 methods: {
  searchLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // Make a request to Google Maps Geocoding API
            axios
              .get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                  latlng: `${latitude},${longitude}`,
                  key: 'AIzaSyA6C7yJDdR8HBM5Rk0MQVzc1PcgswrrZuw',
                },
              })
              .then((response) => {
                if (response.data.status === 'OK' && response.data.results.length > 0) {
                  this.location = response.data.results[0].formatted_address;
                } else {
                  this.location = 'Location not found.';
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          },
          (error) => {
            console.error('Geolocation Error:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported in this browser.');
      }
    },
    
  updateBackgroundColor(color) {
      // تحديث اللون المحدد
      this.selectedColor = color;
    }
  },
  }
  
</script>
<style scoped>
.settings {
  height: fit-content;
  width: 100%;
  background-color: white;
  box-shadow: 1px 1px 7px 1px #e4e4e4;
  border-radius: 8px;
}
.header h2 {
  color: black;
  padding-top: 2px;
  font-size: 20px;
  font-weight: 500;
  margin-left: 5px;
}
h1 {
  color: black;
  font-size: 13px;
}
h3[data-v-63fbf8ba] {
  color: #848484;
  font-size: 13px;
}
p {
  color: #848484;
  font-size: 12px;
  font-weight: 500;
}
.icon {
  background-color: #ddf0ff;
  width: 20px;
  height: 20px;
  border-radius: 13px;
}
.header {
  font-size: 19px;
  color: black;
}
.header-text h1 {
  font-size: 16px;
}
.required p {
  font-size: 14px;
  color: black;
  margin-top: 18px;
}
.btn {
  padding-left: 45px;
  padding-right: 45px;
}

/* label {
  color: black;
} */
/* .label-on {
  color: green;
  margin-top: 17px;
  margin-left: 5px;
}

.label-off {
  color: #878787;
  margin-top: 17px;
} */
.color-preview[data-v-63fbf8ba] {
    width: 25px;
    height: 25px;
    display: inline-block;
    margin-left: 0px !important;
}
.color-preview-2[data-v-63fbf8ba] {
    width: 25px;
    height: 25px;
    display: inline-block;
    margin-left: 0px !important;
}
</style>

<route lang="yaml">
meta:
  action: read
  subject: setting-list
</route>
