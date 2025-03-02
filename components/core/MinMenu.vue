<script setup>
  import tippy from "tippy.js";
  import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
  import { useAuthedUser } from "~/stores/authedUser";
  import {sideMenuItems} from "~/components/core/sideMenu.js";

  const route = useRoute();
  const authedUser = useAuthedUser();
  const isMinimized = defineModel("isMinimized");
  const sideMenu = sideMenuItems;
  const searchResult = ref(sideMenu);
  const query = ref("");
  const logout = () => {
    authedUser.logoutWithKeycloak();
  };

  const toggleSidebar = () => {
    isMinimized.value = false;
    localStorage.setItem("isMinimized", false);
  };
  const searchSection = () => {
    searchResult.value = [];
    sideMenu.forEach((mainSection) => {
      let isAlreadySet = false;
      if (mainSection.title.toLowerCase().includes(query.value.toLowerCase())) {
        isAlreadySet = true;
        searchResult.value.push(mainSection);
      }
      if (mainSection.items.length > 0) {
        mainSection.items.forEach((secondSection) => {
          const isSecondAlreadySet = false;
          if (secondSection.title.toLowerCase().includes(query.value.toLowerCase()) && !isAlreadySet) {
            isAlreadySet = true;
            searchResult.value.push(mainSection);
          }
        });
      }
    });
  };

  onMounted(() => {
    tippy(".tips-menu-element", {
      placement: "right",
      delay: 0,
      content: (reference) => {
        return reference.ariaLabel;
      },
    });
  });
</script>
<template>
  <div class="h-full flex flex-col justify-between px-4 py-8">
    <section id="main-nav" class="flex flex-col gap-y-5">
      <header class="flex flex-col-reverse gap-y-3 justify-center items-center">
        <div id="menu-logo-container" class="flex">
          <NuxtLink to="/">
            <Logo :text-hidden="true" :img-size="'w-8 md:w-12 lg:w-10 xl:w-11'" />
          </NuxtLink>
        </div>
        <div class="cursor-pointer" @click="toggleSidebar">
          <Icon name="material-symbols:menu-rounded" size="24" />
        </div>
      </header>

      <div class="flex flex-col items-center justify-start gap-y-6">
        <div v-for="(group, id) in sideMenu" :key="id" class="tips-menu-element" :aria-label="group.title">
          <Menu v-if="group.items.length" as="div" class="inline-block text-left">
            <div class="overflow-x-visible">
              <MenuButton
                :class="[
                  group.items.find((i) => i.to === route.path) ? 'bg-gradient-to-r from-blue-800 to-blue-600 text-white' : 'hover:text-blue-600',
                  'text-gray-600 p-1 rounded-md flex justify-center items-center',
                ]"
              >
                <Icon :name="group.icon" size="24" />
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
                  class="max-h-[300px] overflow-auto absolute top-[30%] left-10 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="px-1 py-1">
                    <MenuItem v-for="(navItem, idx) in group.items" v-slot="{ active }" :key="idx">
                      <NuxtLink :to="navItem.to" :class="[active ? 'bg-primary text-white' : 'text-gray-600', 'group gap-1 flex w-full items-center rounded-md px-2 py-2 text-xs']">
                        {{ navItem.title }}
                      </NuxtLink>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </div>
          </Menu>

          <div
            v-else
            class="tips-menu-element"
            :aria-label="group.title"
            :class="[
              group.to === route.path ? 'bg-gradient-to-r from-blue-800 to-blue-600 text-white' : 'hover:text-blue-600',
              'text-gray-600 p-1 rounded-md flex justify-center items-center',
            ]"
          >
            <NuxtLink :to="group.to">
              <Icon :name="group.icon" size="24" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
  #items-container::-webkit-scrollbar {
    width: 5px;
  }

  #items-container ::-webkit-scrollbar-thumb {
    background-color: #253E92;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
</style>
