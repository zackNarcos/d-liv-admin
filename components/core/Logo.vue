<template>
  <div class="flex items-center gap-2 md:gap-2 lg:gap-3">
    <img src="~/assets/images/logo.jpg" class="logo rounded" :class="imgSize" />
<!--    <div :class="textHidden ? 'hidden' : ' hidden xl:flex 2xl:flex'" class="slogan flex-col uppercase">-->
<!--      <div class="flex flex-col leading-none">-->
<!--        <span class="font-medium" :class="[textColor, textSize]">Portail des</span>-->
<!--        <span class="font-medium" :class="[textColor, textSize]"> marchés publics </span>-->
<!--      </div>-->
<!--      <div class="w-full h-1 flex items-center justify-between mt-0.5">-->
<!--        <span class="h-full w-1/3 bg-blue-"></span>-->
<!--        <span class="h-full w-1/3 bg-yellow-400 flex items-center justify-center">-->
<!--          <Icon name="ri:star-fill" size="4" class="text-primary" />-->
<!--        </span>-->
<!--        <span class="h-full w-1/3 bg-red-600"></span>-->
<!--      </div>-->
<!--      <span class="font-medium" :class="[textColor, textSize]">République du sénégal</span>-->
<!--    </div>-->
  </div>
</template>

<script setup>
  const props = defineProps({
    textColor: String,
    textSize: String,
    imgSize: String,
    textHidden: Boolean,
  });
  const { textColor, textSize, imgSize } = toRefs(props);
</script>
