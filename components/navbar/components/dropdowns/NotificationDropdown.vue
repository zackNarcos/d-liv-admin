<template>
  <va-dropdown class="notification-dropdown" :offset="[13, 0]" stick-to-edges>
    <template #anchor>
      <!-- <va-icon-notification class="notification-dropdown__icon" /> -->
    </template>
    <va-dropdown-content class="notification-dropdown__content pl-4 pt-4 pb-2">
      <div class="grid grid-cols-2 justify-between mt-1">
        <va-button class="mr-2" size="small"> notifications</va-button>
        <va-button class="" size="small" preset="outline" border-color="primary" @click="markAllAsRead">{{ t("notifications.mark_as_read") }}</va-button>
      </div>
    </va-dropdown-content>
  </va-dropdown>
</template>

<script setup>
  // import VaIconNotification from "~/components/icons/VaIconNotification.vue";

  const markAllAsRead = () => {};
</script>
