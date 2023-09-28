<template>
    <div>
      <ul class="users">
        <li v-for="user in onlineUsers" :key="user.id">
          <a href="#">{{ user.name }}</a>
          <button class="call-button" @click="sendInvitation(user.id)">دعوة</button>
        </li>
      </ul>
  
      <video id="local-video" autoplay></video>
      <video id="remote-video" src="https://meet.jit.si/my-meeting-id"></video>
    </div>
  </template>
  
  <script>
  import { reactive, ref, onMounted, watch } from '@vue/composition-api';
  import RTCPeerConnection from '@gsuite/rtc';
  
  export default {
    setup() {
      const onlineUsers = reactive([]);
      const localVideo = ref(null);
      const remoteVideo = ref(null);
      const pc = reactive({
        iceServers: [
          {
            urls: ['stun:stun.l.google.com:19302'],
          },
        ],
      });
  
      // Get the list of online users
  
      axios.get('/api/users/online').then((response) => {
        onlineUsers.value = response.data;
      });
  
      // Handle the invitation event
  
      function sendInvitation(userId) {
        // Create the invitation
  
        const invitation = {
          userId: userId,
        };
  
        // Send the invitation
  
        axios.post('/api/calls', invitation).then((response) => {
          const link = response.data.link;
  
          // Open the link in a new tab
  
          window.open(link, '_blank');
  
          // Set the link to the Jitsi meeting
  
          this.link = link;
        });
      }
  
      // Watch for the remote offer
  
      watch(
        () => pc.localDescription,
        (newDescription, oldDescription) => {
          if (newDescription) {
            localVideo.value.srcObject = newDescription.sdp;
          }
        },
        {
          immediate: true,
        },
      );
  
      // Watch for the remote answer
  
      watch(
        () => pc.remoteDescription,
        (newDescription, oldDescription) => {
          if (newDescription) {
            remoteVideo.value.srcObject = newDescription.sdp;
          }
        },
        {
          immediate: true,
        },
      );
  
      return {
        onlineUsers,
        localVideo,
        remoteVideo,
      };
    },
  };
  </script>