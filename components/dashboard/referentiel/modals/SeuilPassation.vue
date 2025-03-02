<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-40" @close="closeModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="relative bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:max-w-[600px] sm:w-full p-6 flex flex-col gap-y-4">
              <DialogTitle as="header" class="text-lg leading-6 font-medium text-gray-900">
                <div class="flex justify-between items-center">
                  {{ seuil.uid ? "Mettre à jour le seuil" : "Créer un seuil passation" }}
                  <button
                    class="absolute bg-white shadow-md -top-4 -right-4 w-8 h-8 flex items-center justify-center text-gray-400 rounded-md transition-colors cursor-pointer hover:bg-primary hover:text-white"
                    @click="closeModal()"
                  >
                    <Icon name="heroicons:x-mark" size="18" />
                  </button>
                </div>
              </DialogTitle>

              <form id="ref-seuil-modal" @submit.prevent="onSubmit">
                <div class="bg-white">
                  <div class="mb-2">
                    <div class="relative w-full">
                      <VaSelect
                        v-model="seuil.typeAutorite"
                        required-mark
                        label="Type autorité contractante"
                        placeholder="Choisissez une option"
                        searchable
                        :options="acTypes"
                        :text-by="(option) => option.libelle"
                        :value-by="option"
                      />
                    </div>
                  </div>
                  <div class="mb-2">
                    <div class="relative w-full">
                      <VaSelect
                        v-model="seuil.typeMarche"
                        required-mark
                        :options="marketTypes"
                        placeholder="Choisissez une option"
                        label="Type de marché"
                        searchable
                        :text-by="(option) => option.libelle"
                        :value-by="option"
                        @update:model-value="onMarketTypeChange"
                      />
                    </div>
                  </div>
                  <div>
                    <label>Le seuil possede un plafond ?</label>
                    <VaRadio v-model="seuil.montantSuperieurExiste" :options="opRadio" value-by="value" />
                  </div>
                  <div class="mb-2 flex items-center gap-5 justify-between">
                    <VaInput v-model="seuil.montantInferieur" required-mark label="Montant minimum" mask="numeral" placeholder="Ex: 2 000 000" />
                    <VaInput
                      v-show="seuil.montantSuperieurExiste"
                      v-model="seuil.montantSuperieur"
                      required-mark
                      label="Montant maximum"
                      mask="numeral"
                      placeholder="Ex: 2 000 000"
                    />
                  </div>
                  <div>
                    <div class="relative w-full">
                      <VaSelect
                        v-model="seuil.modePassation"
                        required-mark
                        label="Mode de passation"
                        placeholder="Choisissez une option"
                        searchable
                        :options="filteredPassationModes"
                        :text-by="(option) => option.libelle"
                        :value-by="option"
                      />
                    </div>
                  </div>
                </div>
                <footer class="flex justify-end gap-x-4">
                  <VaButton preset="primary" class="mr-6 mb-2" @click="closeModal">
                    <span class="font-medium">Annuler</span>
                  </VaButton>
                  <VaButton type="submit" :loading="isPushed">
                    <span class="font-medium">Enregistrer</span>
                  </VaButton>
                </footer>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
  import swal from "~/plugins/sweetalert.js";
  import { useAuthedUser } from "~/stores/authedUser";

  const authedUser = useAuthedUser();
  const { $referentielStore } = useNuxtApp();

  const props = defineProps({
    isOpen: Boolean,
    acTypes: {
      type: Array,
      default: () => [],
    },
    marketTypes: {
      type: Array,
      default: () => [],
    },
    s: {
      type: Object,
      default: () => {},
    },
  });
  const emit = defineEmits(["closed", "refresh"]);

  const isPushed = ref(false);
  const filteredPassationModes = ref({});
  const opRadio = [
    {
      text: "Oui",
      value: true,
    },
    {
      text: "Non",
      value: false,
    },
  ];
  const seuil = ref({
    uid: null,
    typeAutorite: {},
    typeMarche: {},
    modePassation: {},
    montantInferieur: 0,
    montantSuperieur: 0,
    montantSuperieurExiste: true,
  });

  const closeModal = () => {
    emit("closed");
  };
  const onMarketTypeChange = (newMarketType) => {
    if (newMarketType) filteredPassationModes.value = newMarketType.passationModeList;
    else filteredPassationModes.value = {};
  };
  const onSubmit = () => {
    if (seuil.value.montantSuperieurExiste && parseInt(seuil.value.montantInferieur, 10) > parseInt(seuil.value.montantSuperieur, 10)) {
      return;
    }
    isPushed.value = true;
    if (seuil.value.uid) {
      $referentielStore
        .updateSeuil({
          uid: seuil.value.uid,
          controlOrganization: {
            uid: authedUser.userData.organization.uid,
          },
          typeMarche: seuil.value.typeMarche,
          typeAutorite: seuil.value.typeAutorite,
          montantInferieur: parseInt(seuil.value.montantInferieur, 10),
          montantSuperieur: parseInt(seuil.value.montantSuperieur, 10),
          modePassation: seuil.value.modePassation,
          type: "PASSATION",
        })
        .then(() => {
          isPushed.value = false;
          emit("refresh");
          closeModal();
        });
    } else {
      $referentielStore
        .createSeuil({
          uid: seuil.uid,
          controlOrganization: {
            uid: authedUser.userData.organization.uid,
          },
          typeMarche: seuil.value.typeMarche,
          typeAutorite: seuil.value.typeAutorite,
          montantInferieur: parseInt(seuil.value.montantInferieur, 10),
          montantSuperieur: parseInt(seuil.value.montantSuperieur, 10),
          modePassation: seuil.value.modePassation,
          type: "PASSATION",
        })
        .then((res) => {
          isPushed.value = false;
          if (res.success == true) {
            emit("refresh");
            closeModal();
          } else alert(res);
        })
        .catch((err) => {
          isPushed.value = false;
          console.log(err);
        });
    }
  };

  watch(
    () => props.isOpen,
    (isOpen) => {
      if (isOpen) {
        if (props.s.uid) seuil.value = { ...props.s, montantSuperieurExiste: !(props.s.montantSuperieur === -1) };
        else seuil.value.montantSuperieurExiste = true;
      } else {
        seuil.value.uid = null;
        seuil.value.typeAutorite = {};
        seuil.value.typeMarche = {};
        seuil.value.modePassation = {};
        seuil.value.montantInferieur = 0;
        seuil.value.montantSuperieur = 0;
        seuil.value.montantSuperieurExiste = true;
      }
    },
  );

  watch(
    () => seuil.value.montantSuperieurExiste,
    (exist) => {
      if (!exist) seuil.value.montantSuperieur = -1;
      else seuil.value.montantSuperieur = props.s.montantSuperieur === -1 ? 0 : props.s.montantSuperieur;
      // todo: if error later, remove the 'else'
    },
  );
</script>

<style>
  #ref-seuil-modal .va-input-wrapper__field {
    border: 1px solid #dbdade;
    max-height: 38px;
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

  #ref-seuil-modal .va-input-wrapper__label,
  #ref-seuil-modal label {
    font-family: "Public Sans", sans-serif !important;
    font-size: 14px !important;
    letter-spacing: 0 !important;
    font-weight: 400 !important;
    color: #4b465c !important;
    line-height: 1.25rem !important;
    margin-bottom: 5px !important;
    text-transform: none;
  }

  #ref-seuil-modal .va-button {
    max-height: 38px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0 0 0;
  }
</style>
