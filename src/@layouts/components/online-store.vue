<template>
        <div class="items mt-4">
            <v-divider></v-divider>
            <p class="text-black fw-bold ">online member(3)</p>
            <h6 class="ml-2">Staff</h6>
          <div class="link d-flex mt-3 mb-3">
            <ul>
               <v-icon class="icon" icon="mdi-account"></v-icon>
               <v-badge dot color="success" location="bottom right" offset-y="-18" offset-x="14"   >
                </v-badge>
            </ul>
            <li class="pt-2 ml-2 text-black fw-bold">Alaa Ahmed</li>
            <v-btn class="btn-5" variant="text"> invite</v-btn>
          </div>
          <div class="link d-flex mt-3 mb-3">
            <ul>
               <v-icon class="icon" icon="mdi-account"></v-icon>
               <v-badge dot color="success" location="bottom right" offset-y="-18" offset-x="14"   >
                </v-badge>
            </ul>
            <li class="pt-2 ml-2 text-black fw-bold">Yassin Mohamed</li>
            <v-btn class="btn-6" variant="text"> invite</v-btn>
          </div>
          <div class="link d-flex mt-3 mb-3">
            <ul>
               <v-icon class="icon" icon="mdi-account"></v-icon>
               <v-badge dot color="success" location="bottom right" offset-y="-18" offset-x="14"   >
                </v-badge>
            </ul>
            <li class="pt-2 ml-2 text-black fw-bold">Sami Mahmoud</li>.
            <v-btn class="btn-7" variant="text"> invite</v-btn>
          </div>
        </div>
        <div class="items-2 mt-4">
            <h6 class="ml-2 mb-2">patient</h6>
            <div class="link d-flex mt-3 mb-3">
            <ul>
               <v-icon class="icon" icon="mdi-account"></v-icon>
               <v-badge dot color="success" location="bottom right" offset-y="-18" offset-x="14"   >
                </v-badge>
            </ul>
            <li class="pt-2 ml-2 text-black fw-bold">sali Mahmoud</li>.
            <v-btn class="btn-7" variant="text"> Join</v-btn>
          </div>
          <div class="link d-flex mt-3 mb-3">
            <ul>
               <v-icon class="icon" icon="mdi-account"></v-icon>
               <v-badge dot color="success" location="bottom right" offset-y="-18" offset-x="14"   >
                </v-badge>
            </ul>
            <li class="pt-2 ml-2 text-black fw-bold">Androw Fadi</li>
            <v-btn class="btn-9" variant="text"> Join</v-btn>
          </div>
        </div>
        </template>

<script>
export default {
name: "online-store"
}
</script>

<style>
.link li {
    font-size: 10px;
    white-space: pre;
    margin-top: 10px;
}
.v-btn__content {
    grid-area: content;
    justify-content: center;
    white-space: nowrap;
    font-size: 14px;
    text-transform: capitalize;
}
.btn-5 {
    margin-left: 42px;
    margin-top: 5px;
    font-size: 4px;
}
.btn-6 {
    margin-left: 20px;
    margin-top: 5px;
    font-size: 4px;
}
.btn-7 {
    margin-left: 20px;
    margin-top: 5px;
    font-size: 4px;
    }
    .btn-8 {
    margin-left: 34px;
    margin-top: 5px;
    font-size: 4px;
    }
    .btn-9 {
    margin-left: 34px;
    margin-top: 5px;
    font-size: 4px;
    }
    .dots {
      width: 100px;
    }
</style>