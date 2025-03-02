<template>
  <div>
    <div v-if="isSearching" class="fixed flex flex-col gap-5 items-center justify-center top-[68px] left-0 w-full h-screen bg-gray-600 z-50 bg-opacity-100">
      <form @submit.prevent="submitForm">
        <div class="mx-auto max-w-3xl sm:flex sm:space-x-3 p-3 bg-white border rounded-lg dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
          <div class="pt-2 sm:pt-0 sm:ps-3 dark:border-gray-700">
            <input
              id="search-form"
              v-model="query"
              type="text"
              class="rounded-md text-lg focus:outline-none py-3 px-2.5 w-94 md:w-[550px]"
              placeholder="Entrez vos mots clefs ici..."
            />
          </div>
          <div class="pt-2 sm:pt-0 grid sm:block sm:flex-[0_0_auto]">
            <button
              type="submit"
              class="py-3 px-2.5 inline-flex justify-center items-center gap-x-2 text-lg font-semibold rounded-md border border-transparent bg-primary text-white hover:bg-primary-light dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
            >
              Rechercher
            </button>
          </div>
        </div>
      </form>
    </div>
    <Icon v-if="!isSearching" name="ic:baseline-search" class="dark:text-gray-700 text-gray-600 cursor-pointer" size="30" @click="isSearching = !isSearching" />
    <Icon v-else name="bx:x" size="35" class="dark:text-gray-700 text-gray-600 cursor-pointer" @click="isSearching = !isSearching" />
  </div>
</template>
<script setup>
  const isSearching = ref(false);
  const query = ref("");
  const router = useRouter();
  const submitForm = () => {
    router.push({ path: "search", query: { query: query.value } });
  };
</script>
