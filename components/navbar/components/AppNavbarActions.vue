<template>
  <div class="app-navbar-actions">
    <notification-dropdown class="app-navbar-actions__item" />
    <profile-dropdown class="app-navbar-actions__item app-navbar-actions__item--profile">
      <span>Admin</span>
    </profile-dropdown>
  </div>
</template>

<script setup>
  import NotificationDropdown from "~/components/navbar/components/dropdowns/NotificationDropdown.vue";
  import ProfileDropdown from "~/components/navbar/components/dropdowns/ProfileDropdown.vue";
</script>
