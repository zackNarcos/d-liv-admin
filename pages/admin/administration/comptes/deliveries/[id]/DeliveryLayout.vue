<template>
  <div>
    <AdminLayout>
      <Head>
        <Title>{{ title }}</Title>
        <Meta name="description" :content="title" />
      </Head>
      <div class="my-5 text-md md:text-lg lg:text-2xl font-semibold text-gray-500">{{title}}</div>
      <!-- on data load   -->
      <div class="my-5 flex gap-3 w-5/6 mx-auto" v-if="$usersStore?.single.loading">
        <div class="w-1/5">
          <div class="flex rounded-lg shadow-lg w-full p-3 gap-3 flex-col bg-white items-center justify-start">
            <VaSkeleton class="ms-auto" variant="rounded" inline width="100%" height="70px"  v-for="i in 5" :key="i" />
          </div>
        </div>
        <div class="w-4/5 bg-white p-5 rounded-lg shadow-lg h-full overflow-y-auto">
          <VaSkeleton class="ms-auto"  inline width="100%" height="300px" />
        </div>
      </div>

      <div class="w-full flex justify-between px-8">
        <!--          prev-->
        <button class="bg-blue-800 text-white px-6 py-2 rounded-lg" @click="router.push('/admin/administration/comptes/deliveries')">
          <Icon name="bi:arrow-left" size="20" />
          Profil précedent
        </button>
        <!--          next-->
        <button class="bg-blue-800 text-white px-6 py-2 rounded-lg" @click="router.push('/admin/administration/comptes/deliveries/'+id+'/vehicule')">
          Profil suivant
          <Icon name="bi:arrow-right" size="20" />
        </button>

      </div>
      <!--  show data     -->
      <div class="my-5 flex gap-3 w-5/6 mx-auto" v-if="!$usersStore?.single.loading">

        <div class="w-1/5">
          <!-- list till of step -->
          <div class="flex flex-col justify-between items-center gap-3">
            <!-- users informations -->
            <div class="flex rounded-lg shadow-lg w-full p-3 bg-white items-center justify-start relative cursor-pointer hover:bg-blue-800/10 transition-all duration-300 ease-in-out"
                @click="open = true"
                 :class="{'bg-blue-300/50': route.path.includes('personnal-info')}"
            >
                <div class="bg-blue-800/10 rounded-full p-2 text-blue-800 flex">
                    <Icon name="bi:card-text" size="20" />
                </div>
                <div class="text-lg font-semibold text-gray-500 ps-4 flex items-center justify-between w-full">
                    <span>Informations personnelles</span>
                    <Icon name="bi:arrow-right" size="20" />
                </div>
            </div>
            <!-- users piece -->
            <div class="flex rounded-lg shadow-lg w-full p-3 bg-white items-center justify-start relative cursor-pointer hover:bg-blue-800/10 transition-all duration-300 ease-in-out"
                @click="router.push('/admin/administration/comptes/deliveries/'+id+'/piece')"
                :class="{'bg-blue-300/50': route.path.includes('piece')}"
            >
                <div class="bg-blue-800/10 rounded-full p-2 flex text-blue-800">
                    <Icon name="bi:person-vcard" size="20" />
                </div>
                <div class="text-lg font-semibold text-gray-500 ps-4 flex items-center justify-between w-full">
                    <span>Piece d'identité</span>
                    <Icon name="bi:arrow-right" size="20" />
                </div>
                <div class="absolute -top-2 -right-2 rounded-xl px-2 text-xs"
                    :class="getStatusBadge(user?.registrationSteps?.cni?.status).color + ' ' + getStatusBadge(user?.registrationSteps?.cni?.status).textColor"
                >
                  {{ getStatusBadge(user?.registrationSteps?.cni?.status).text }}
                </div>
            </div>

            <!-- car info -->
            <div class="flex rounded-lg shadow-lg w-full p-3 bg-white items-center justify-start relative cursor-pointer hover:bg-blue-800/10 transition-all duration-300 ease-in-out"
                @click="router.push('/admin/administration/comptes/deliveries/'+id+'/vehicule')"
                :class="{'bg-blue-300/50': route.path.includes('vehicule')}"
            >
                <div class="bg-blue-800/10 rounded-full p-2 flex text-blue-800">
                    <Icon name="bi:car-front" size="20" />
                </div>
                <div class="text-lg font-semibold text-gray-500 ps-4 flex items-center justify-between w-full">
                    <span>Informations du véhicule {{ user.value }}</span>
                    <Icon name="bi:arrow-right" size="20" />
                </div>
                <div class="absolute -top-2 -right-2 rounded-xl px-2 text-xs"
                    :class="getStatusBadge(user?.registrationSteps?.vehicle?.status).color + ' ' + getStatusBadge(user?.registrationSteps?.vehicle?.status).textColor"
                >
                  {{ getStatusBadge(user?.registrationSteps?.vehicle?.status).text }}
                </div>
            </div>

            <!-- licence piece -->
            <div class="flex rounded-lg shadow-lg w-full p-3 bg-white items-center justify-start relative cursor-pointer hover:bg-blue-800/10 transition-all duration-300 ease-in-out"
                @click="router.push('/admin/administration/comptes/deliveries/'+id+'/licence')"
                :class="{'bg-blue-300/50': route.path.includes('licence')}"
            >
              <div class="bg-blue-800/10 rounded-full p-2 flex text-blue-800">
                  <Icon name="bi:file-earmark-richtext" size="20" />
              </div>
              <div class="text-lg font-semibold text-gray-500 ps-4 flex items-center justify-between w-full">
                  <span>Permis de conduire</span>
                  <Icon name="bi:arrow-right" size="20" />
              </div>
              <div class="absolute -top-2 -right-2 rounded-xl px-2 text-xs"
                   :class="getStatusBadge(user?.registrationSteps?.licence?.status).color + ' ' + getStatusBadge(user?.registrationSteps?.licence?.status).textColor"
              >
                {{ getStatusBadge(user?.registrationSteps?.licence?.status).text }}
              </div>
            </div>

            <!-- grey card -->
            <div class="flex rounded-lg shadow-lg w-full p-3 bg-white items-center justify-start relative cursor-pointer hover:bg-blue-800/10 transition-all duration-300 ease-in-out"
                @click="router.push('/admin/administration/comptes/deliveries/'+id+'/carte-grise')"
                :class="{'bg-blue-300/50': route.path.includes('carte-grise')}"
            >
              <div class="bg-blue-800/10 rounded-full p-2 flex text-blue-800">
                  <Icon name="bi:credit-card-2-front" size="20" />
              </div>
              <div class="text-lg font-semibold text-gray-500 ps-4 flex items-center justify-between w-full">
                  <span>Carte grise</span>
                  <Icon name="bi:arrow-right" size="20" />
              </div>
              <div class="absolute -top-2 -right-2 rounded-xl px-2 text-xs"
                   :class="getStatusBadge(user?.registrationSteps?.cardGrey?.status).color + ' ' + getStatusBadge(user?.registrationSteps?.cardGrey?.status).textColor"
              >
                {{ getStatusBadge(user?.registrationSteps?.cardGrey?.status).text }}
              </div>
            </div>

            <!-- iban -->
            <div class="flex rounded-lg shadow-lg w-full p-3 bg-white items-center justify-start relative cursor-pointer hover:bg-blue-800/10 transition-all duration-300 ease-in-out"
                @click="router.push('/admin/administration/comptes/deliveries/'+id+'/iban')"
                :class="{'bg-blue-300/50': route.path.includes('iban')}"
            >
              <div class="bg-blue-800/10 rounded-full p-2 flex text-blue-800">
                  <Icon name="bi:credit-card-2-back" size="20" />
              </div>
              <div class="text-lg font-semibold text-gray-500 ps-4 flex items-center justify-between w-full">
                  <span>IBAN</span>
                  <Icon name="bi:arrow-right" size="20" />
              </div>
              <div class="absolute -top-2 -right-2 rounded-xl px-2 text-xs"
                   :class="getStatusBadge(user?.registrationSteps?.iban?.status).color + ' ' + getStatusBadge(user?.registrationSteps?.iban?.status).textColor"
              >
                {{ getStatusBadge(user?.registrationSteps?.iban?.status).text }}
              </div>
            </div>
          </div>
        </div>
        <div class="w-4/5 bg-white p-5 rounded-lg shadow-lg h-full overflow-y-auto">
          <div class="text-gray-500">
            <slot></slot>
          </div>
        </div>

      </div>
      <TransitionRoot as="template" :show="open">
          <Dialog class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
              <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-hidden">
              <div class="absolute inset-0 overflow-hidden">
                <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                    <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                      <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                        <div class="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                          <button type="button" class="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden" @click="open = false">
                            <span class="absolute -inset-2.5" />
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="size-6" aria-hidden="true" />
                          </button>
                        </div>
                      </TransitionChild>
                      <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        <div class="px-4 sm:px-6">
                          <DialogTitle class="text-base font-semibold text-gray-900">Panel title</DialogTitle>
                        </div>
                        <div class="relative mt-6 flex-1 px-4 sm:px-6">
                          <ModalPersonnalInfo />
                        </div>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
    </AdminLayout>
  </div>

</template>
<script setup>
import AdminLayout from '~/layouts/AdminLayout.vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import ModalPersonnalInfo from './ModalPersonnalInfo.vue';
import { StatusEnum } from '~/lib/status.enum';

const open = ref(false);

const route = useRoute()
const router = useRouter()
const { $usersStore } = useNuxtApp();

const title = ref('Details')

const id = route.params.id

const user = ref($usersStore?.single.data);
watchEffect(() => {
  user.value = $usersStore?.single.data;
  title.value = `${user.value?.firstName} ${user.value?.lastName}`;
});

const getStatusBadge = (status) => {
  switch (status) {
    case StatusEnum.PENDING:
      return { text: 'Attente de documents', color: 'bg-orange-200', textColor: 'text-orange-800' };
    case StatusEnum.UNDER_REVIEW:
      return { text: 'Attente de validation', color: 'bg-blue-200', textColor: 'text-blue-800' };
    case StatusEnum.VERIFIED:
      return { text: 'Vérifié', color: 'bg-green-200', textColor: 'text-green-800' };
    case StatusEnum.REJECTED:
      return { text: 'Rejeté', color: 'bg-red-200', textColor: 'text-red-800' };
    default:
      return { text: 'Inconnu', color: 'bg-gray-200', textColor: 'text-gray-800' };
  }
};

onMounted(async () => {
  await $usersStore.fetchUser(id);
})

</script>