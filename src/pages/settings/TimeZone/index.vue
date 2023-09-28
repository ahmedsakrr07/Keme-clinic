<script>
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
    
  updateBackgroundColor(color) {
      // تحديث اللون المحدد
      this.selectedColor = color;
    }
  },
  }
</script>
<template>
           <div>
            <v-container>
              <v-row>
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
              </v-row>
            </v-container>
           </div>
</template>

<style scoped>
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
.header {
  font-size: 19px;
  color: black;
}
 h1 {
  font-size: 16px;
  color: black;
}
 p {
  font-size: 14px;
  color: black;
  margin-top: 18px;
}
</style>

<route lang="yaml">
  meta:
    action: read
    subject: clinic-setting
  </route>


