<template>
    <div>
        <div class="flex justify-center items-center">
            <img
                class="inline-block size-25 rounded ring-2 ring-white h-48 w-48 object-cover"
                :src="user?.registrationSteps?.realTimePicture?.files[0] ? user?.registrationSteps?.realTimePicture?.files[0]?.url : '/images/logo.jpg'"
                alt=""
            >
        </div>
        <div class="flex justify-center items-center">
            <h1 class="text-2xl font-semibold text-gray-500">Informations personnelles</h1>
        </div>
        <div class="mt-4">
            <!-- firstName -->
            <div class="flex flex-col justify-start border-b border-gray-200 mt-2">
                <div class="flex justify-start">
                    <h1 class="text-lg text-gray-500">Nom</h1>
                </div>
                <div class="flex justify-start">
                    <p class="text-lg font-semibold text-gray-500">{{ user?.firstName }}</p>
                </div>
            </div>
            <!-- lastName -->
            <div class="flex flex-col justify-start border-b border-gray-200 mt-2">
                <div class="flex justify-start">
                    <h1 class="text-lg text-gray-500">Prénom</h1>
                </div>
                <div class="flex justify-start">
                    <p class="text-lg font-semibold text-gray-500">{{ user?.lastName }}</p>
                </div>
            </div>
            <!-- email -->
            <div class="flex flex-col justify-start border-b border-gray-200 mt-2">
                <div class="flex justify-start">
                    <h1 class="text-lg text-gray-500">Email</h1>
                </div>
                <div class="flex justify-start">
                    <p class="text-lg font-semibold text-gray-500">{{ user?.email }}</p>
                </div>
            </div>
            <!-- phone -->
            <div class="flex flex-col justify-start border-b border-gray-200 mt-2">
                <div class="flex justify-start">
                    <h1 class="text-lg text-gray-500">Téléphone</h1>
                </div>
                <div class="flex justify-start">
                    <p class="text-lg font-semibold text-gray-500">{{ user?.phone }}</p>
                </div>
            </div>
            <!-- date of birth -->
            <div class="flex flex-col justify-start border-b border-gray-200 mt-2">
                <div class="flex justify-start">
                    <h1 class="text-lg text-gray-500">Date de naissance</h1>
                </div>
                <div class="flex justify-start">
                    <p class="text-lg font-semibold text-gray-500">{{ user?.dateOfBirth }}</p>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>


const { $usersStore } = useNuxtApp();
const user = ref($usersStore?.single.data);
watchEffect(() => {
  user.value = $usersStore?.single.data;
});

</script>