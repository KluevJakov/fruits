<template>
  <template v-if="isAdmin">
    <DefaultView />
  </template>
  <template v-else>
    <AppBar v-if="!isLocationAdmin"/>
    <!-- <MobileAppBar v-if="isMobile" /> -->
    <DefaultView />
    <Footer />
  </template>
</template>
  
<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import AppBar from '../components/AppBar.vue';
import Footer from '../components/FooterDefault.vue'
import DefaultView from './View.vue';
import { useRoute } from 'vue-router';

const isAdmin = ref(false);

const route = useRoute();
const isLocationAdmin = computed(() => route.path.includes('adminPage'))
</script>
  