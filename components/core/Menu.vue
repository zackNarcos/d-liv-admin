<script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
  import { useAuthedUser } from "~/stores/authedUser";
  import {sideMenuItems} from "~/components/core/sideMenu.js";

  const authedUser = useAuthedUser();
  const route = useRoute();
  const isMinimized = defineModel("isMinimized", { type: Boolean, default: false });

  const sideMenu = sideMenuItems;

  const searchResult = ref(sideMenu);
  const query = ref("");
  const toggleSidebar = () => {
    isMinimized.value = true;
    localStorage.setItem("isMinimized", true);
  };
  const searchSection = () => {
    searchResult.value = [];
    if (!query.value) {
      searchResult.value = sideMenu;
      return;
    }
    sideMenu.forEach((mainSection, index) => {
      let isAlreadySet = false;
      if (mainSection.title.toLowerCase().includes(query.value.toLowerCase())) {
        isAlreadySet = true;
        const regEx = new RegExp(query.value, "ig");
        searchResult.value.push({
          title: mainSection.title.replace(regEx, `<mark>${query.value}</mark>`),
          icon: mainSection.icon,
          to: mainSection.to,
          items: mainSection.items,
        });
      }
      if (mainSection.items.length > 0) {
        const items = [];
        mainSection.items.forEach((secondSection) => {
          if (secondSection.title.toLowerCase().includes(query.value.toLowerCase()) && !isAlreadySet) {
            const regEx = new RegExp(query.value, "ig");
            items.push({
              title: secondSection.title.replace(regEx, `<mark>${query.value}</mark>`),
              icon: secondSection.icon,
              to: secondSection.to,
              items: secondSection.items,
            });
          }
        });
        if (items.length > 0) {
          isAlreadySet = true;
          searchResult.value.push({
            title: mainSection.title,
            icon: mainSection.icon,
            to: mainSection.to,
            items: items,
          });
        }
      }
    });
  };
</script>

<template>
  <div class="h-full grid grid-rows-[1fr] justify-between px-4 pb-6">
    <!--can replace pb-6 by py and remove bottom pt-->
    <section id="main-nav" class="max-h-full overflow-y-auto flex flex-col gap-y-5 pt-6 pb-8">
      <header class="flex justify-between items-center">
        <div id="menu-logo-container" class="flex">
          <NuxtLink to="/">
            <Logo :text-color="'text-gray-600'" :img-size="'w-10'" :text-size="'text-[10px]'" />
          </NuxtLink>
        </div>
        <div class="cursor-pointer" @click="toggleSidebar">
          <Icon name="material-symbols:menu-rounded" size="24" />
        </div>
      </header>
      <div id="menu-search-zone">
        <VaInput v-model="query" placeholder="Rechercher une section" clearable @keyup="searchSection" @clear="searchResult = sideMenu">
          <template #prependInner>
            <VaIcon name="search" color="secondary" />
          </template>
        </VaInput>
      </div>
      <main>
        <template v-if="searchResult.length > 0">
          <template v-for="sideMenuItem in searchResult" :key="sideMenuItem">
            <Disclosure v-if="sideMenuItem.items && sideMenuItem.items.length > 0" v-slot="{ open }" :default-open="sideMenuItem.items.find((i) => i.to === route.path)">
              <DisclosureButton
                class="flex text-gray-600 w-full h-12 items-center justify-between rounded-lg text-left text-md font-medium focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75"
              >
                <div class="flex items-center gap-x-4">
                  <Icon :name="sideMenuItem.icon" size="22" class="ml-2" />
                  <span v-html="sideMenuItem.title"></span>
                </div>
                <Icon name="ic:baseline-keyboard-arrow-down" class="h-5 w-5" :class="[open ? 'rotate-180 transform' : '']" />
              </DisclosureButton>
              <DisclosurePanel class="pb-2 pl-4 text-md text-gray-500">
                <div v-for="navItem in sideMenuItem.items" :key="navItem">
                  <div v-if="navItem.items">
                    <Disclosure v-slot="{ open }">
                      <DisclosureButton
                        class="flex w-full items-center gap-1 rounded-0 mb-1 py-2 text-left text-md font-medium text-gray-500 hover:text-primary hover:bg-primary/25 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75"
                      >
                        <Icon name="ic:outline-circle" size="14" class="ml-1" />
                        <span v-html="navItem.title"></span>
                        <Icon name="ic:baseline-keyboard-arrow-down" :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 text-gray-700" />
                      </DisclosureButton>
                      <DisclosurePanel class="px-4 pb-2 text-md text-gray-500" :static="navItem.items.find((i) => i.to === route.path)">
                        <NuxtLink
                          v-for="(subNavItem, subIdx) in navItem.items"
                          :key="subIdx"
                          :to="subNavItem.to"
                          :class="{
                            'bg-gradient-to-r from-blue-800 to-blue-600 shadow-md text-white rounded-md': route.path === subNavItem.to,
                          }"
                          class="flex items-center cursor-pointer py-2 text-left text-gray-500 text-md"
                        >
                          <Icon name="ic:outline-circle" size="14" class="mx-1" />
                          <span v-html="subNavItem.title"></span>
                        </NuxtLink>
                      </DisclosurePanel>
                    </Disclosure>
                  </div>
                  <div v-else>
                    <NuxtLink
                      v-if="navItem.to === '/admin/passation-des-marches/procedures-a-valider' && navItem.isDisplayed"
                      :to="navItem.to"
                      :class="{
                        'bg-gradient-to-r from-blue-800 to-blue-600 shadow-md text-white rounded-md': route.path === navItem.to,
                      }"
                      class="flex items-center h-11 cursor-pointer py-2 text-left text-gray-500 text-md rounded"
                    >
                      <Icon name="ic:outline-circle" size="14" class="mx-1" />
                      <VaBadge :text="navItem.count || '0'" overlap class="mr-6" :offset="[10, 6]">
                        <span v-html="navItem.title"></span>
                      </VaBadge>
                    </NuxtLink>
                    <NuxtLink
                      v-if="navItem.to === '/admin/passation-des-marches/procedure-de-passation' && authedUser.userData.organization?.typeOrganization === 'CONTRACTING'"
                      :to="navItem.to"
                      :class="{
                        'bg-gradient-to-r from-blue-800 to-blue-600 shadow-md text-white rounded-md': route.path === navItem.to,
                      }"
                      class="flex items-center h-11 cursor-pointer py-2 text-left text-gray-500 text-md rounded"
                    >
                      <Icon name="ic:outline-circle" size="14" class="mx-1" />
                      <span v-html="navItem.title"></span>
                    </NuxtLink>
                    <NuxtLink
                      v-if="navItem.to !== '/admin/passation-des-marches/procedures-a-valider' && navItem.to !== '/admin/passation-des-marches/procedure-de-passation'"
                      :to="navItem.to"
                      :class="{
                        'bg-gradient-to-r from-blue-800 to-blue-600 shadow-md text-white rounded-md': route.path === navItem.to,
                      }"
                      class="flex items-center h-11 cursor-pointer py-2 text-left text-gray-500 text-md rounded"
                    >
                      <Icon name="ic:outline-circle" size="14" class="mx-1" />
                      <span v-html="navItem.title"></span>
                    </NuxtLink>
                  </div>
                </div>
              </DisclosurePanel>
            </Disclosure>
            <div v-else>
              <NuxtLink
                :to="sideMenuItem.to"
                :class="[route.path === sideMenuItem.to ? 'bg-gradient-to-r from-blue-800 to-blue-600 shadow-md text-white rounded-md' : 'bg-white text-gray-600']"
                class="flex h-12 items-center gap-x-4 text-gray-700 rounded-lg py-2"
              >
                <Icon :name="sideMenuItem.icon" size="22" class="ml-2" />
                <span v-html="sideMenuItem.title"></span>
              </NuxtLink>
            </div>
          </template>
        </template>
        <span v-else> Aucun résultat trouvé pour la recherche. </span>
      </main>
    </section>
  </div>
</template>

<style scoped>
  #main-nav::-webkit-scrollbar {
    display: none !important;
  }

  #main-nav {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }
</style>

<style>
  #menu-search-zone .va-input-wrapper__field {
    border: 1px solid #dbdade;
    border-radius: 8px;
    font-size: 14px;
    font-family: "Public Sans", sans-serif !important;
    letter-spacing: 0 !important;
    font-weight: 400 !important;
    color: #4b465c !important;
    line-height: 1.25rem !important;
    margin-bottom: 5px !important;
    text-transform: none;
  }
</style>
