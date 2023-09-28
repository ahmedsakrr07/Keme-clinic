<template>
  <div>
    <VBtn @click="startMeeting">
      Start Meeting
    </VBtn>
    <div id="jitsi-container" />
  </div>
</template>

<script setup>
import { ref , onMounted } from 'vue'

const startMeeting = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let roomName = ''
  let counter = 0
  while (counter < 20) {
    roomName += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter++
  }

  const domain =  'meet.bhus.app' // Change to your Jitsi Meet server domain
  const displayName = 'YourDisplayName' // Set your display name

  const container = document.querySelector('#jitsi-container')

  const jitsiConfig = {
    roomName: roomName,
    width: '100%',
    height: '100%',
    lang: 'en',
    domain         : 'meet.bhus.app',
    userName       : 'bhusapp',
    password       : 'rz2VJ3Awqo',
    parentNode: container,
    interfaceConfigOverwrite: {
      TOOLBAR_ALWAYS_VISIBLE: false,
      MOBILE_APP_PROMO: false,
    },
    userInfo: {
      displayName: displayName,
    },
  }

  const api = new JitsiMeetExternalAPI(domain, jitsiConfig)
}

onMounted(() => {
  const script = document.createElement('script')

  script.src = 'https://meet.jit.si/external_api.js'
  script.async = true
  script.onclick = () => {
    startMeeting()
  }
  document.head.appendChild(script)
})
</script>

<style>
  #jitsi-container {
    width: 100%;
    height: 500px;
  }
</style>
