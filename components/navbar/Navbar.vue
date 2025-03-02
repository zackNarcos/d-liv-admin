<template>
  <div class="sticky top-0 z-40">
    <div class="flex items-center justify-between py-2.5 px-3 rounded-md bg-white shadow-sm mt-1">
      <div>
        <div class="hidden sm:block">
          <label for="icon" class="sr-only">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
              <Icon name="octicon:search-24" size="22" class="text-gray-400" />
            </div>
            <input
              id="icon"
              type="text"
              name="icon"
              class="py-2 px-4 ps-11 pe-20 block w-92 md:w-96 bg-transparent focus:outline-none rounded-lg text-sm text-gray-500 focus:ring-1 focus:border-gray-200 focus:ring-gray-300 placeholder:text-gray-400"
              placeholder="Rechercher..."
            />
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="relative">
          <Icon name="tdesign:notification" size="22" />
          <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2">88</div>
        </div>
        <Menu as="div" class="inline-block text-left">
          <div class="overflow-x-visible">
            <MenuButton>
              <div class="relative">
                <VaAvatar
                    color="blue-800"
                    class="mr-6"
                    size="39px"
                >
                  <span class="text-[16px] font-semibold">{{ user?.firstName.charAt(0) }}.{{ user?.lastName.charAt(0) }}</span>
                </VaAvatar>
                <span class="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
              </div>
            </MenuButton>
            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                  id="items-container"
                  class="max-h-[300px] overflow-auto absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <NuxtLink to="/admin/me" :class="[active ? 'bg-primary text-white' : 'text-gray-600', 'group gap-1 flex w-full items-center rounded-md px-2 py-2']">
                      <span>Mon profil</span>
                    </NuxtLink>
                  </MenuItem>
<!--                  <MenuItem v-slot="{ active }">-->
<!--                    <NuxtLink to="/admin/me" :class="[active ? 'bg-primary text-white' : 'text-gray-600', 'group gap-1 flex w-full items-center rounded-md px-2 py-2']">-->
<!--                      <span>Paramètres</span>-->
<!--                    </NuxtLink>-->
<!--                  </MenuItem>-->
                  <MenuItem v-slot="{ active }">
                    <a @click="logout" :class="[active ? 'bg-primary text-white' : 'text-gray-600', 'group gap-1 flex w-full items-center rounded-md px-2 py-2']">
                      <span>Déconnexion</span>
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </div>
        </Menu>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { useAuthedUser } from "~/stores/authedUser";
  import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

  const authedUser = useAuthedUser();

  const user = ref(authedUser?.userData);

  async function logout() {
    await authedUser.logout();
  }
</script>
