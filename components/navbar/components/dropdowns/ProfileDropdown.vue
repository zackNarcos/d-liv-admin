<template>
  <div class="profile-dropdown-wrapper">
    <va-dropdown v-model="isShown" class="profile-dropdown" stick-to-edges :offset="[13, 0]">
      <template #anchor>
        <span class="profile-dropdown__anchor">
          <slot />
          <va-icon class="px-2" :name="isShown ? 'angle_up' : 'angle_down'" :color="'#f8f8f8'" />
        </span>
      </template>
      <va-dropdown-content class="profile-dropdown__content">
        <va-list-item v-for="option in options" :key="option.name" class="p-2">
          <NuxtLink :to="{ name: option.redirectTo }" class="profile-dropdown__item">
            {{ option.name }}
          </NuxtLink>
        </va-list-item>
      </va-dropdown-content>
    </va-dropdown>
  </div>
</template>

<script setup>
  const isShown = ref(false);
  const options = [
    {
      name: "profile",
      redirectTo: "",
    },
    {
      name: "logout",
      redirectTo: "login",
    },
  ];
</script>

<style lang="scss" scoped></style>
