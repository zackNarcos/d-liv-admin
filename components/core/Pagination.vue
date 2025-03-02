<!-- Pagination.vue -->

<template>
  <nav v-if="totalPages > 1" class="flex items-center justify-center" aria-label="Pagination">
    <ul class="flex items-center gap-1">
      <li :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }">
        <a aria-label="Previous" class="inline-block px-3 py-1 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer transition duration-300" @click="prevPage">
          Précédent
        </a>
      </li>
      <li v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
        <a
          :class="[
            'inline-block px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-600  rounded-md cursor-pointer transition duration-300',
            {
              'bg-blue-900/75 shadow-sm text-white hover:bg-blue-900': page === currentPage,
            }, // Different background for active page
          ]"
          @click="gotoPage(page)"
          >{{ page }}</a
        >
      </li>
      <li :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }">
        <a aria-label="Next" class="inline-block px-3 py-1 text-gray-500 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer transition duration-300" @click="nextPage">
          Suivant
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: {
      currentPage: Number,
      totalPages: Number,
      onPageChange: Function,
    },
    methods: {
      gotoPage(page) {
        if (page !== this.currentPage) {
          this.onPageChange(page);
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.gotoPage(this.currentPage - 1);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.gotoPage(this.currentPage + 1);
        }
      },
    },
  };
</script>
