<!-- el Save.vue es un componente que permite crear o editar un registro -->
<script setup lang="ts">
import type { Interprete } from '@/models/interprete'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

//aqui se define el endpoint de la API(ENDPOINT quiere decir punto final)
const ENDPOINT = 'interpretes'
const props = defineProps({
  mostrar: Boolean,
  interprete: {
    type: Object as () => Interprete,
    default: () => ({}) as Interprete
  },
  modoEdicion: Boolean
})
//aqui se definen los eventos que se pueden emitir
const emit = defineEmits(['guardar', 'close'])

//aqui el dialogVisible es una variable computada que se encarga de mostrar o no el dialogo
const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  }
})
//aqui se define el interprete que es un objeto que se encarga de almacenar los datos del interprete
const interprete = ref<Interprete>({ ...props.interprete })
watch(
  () => props.interprete,
  (newVal) => {
    interprete.value = { ...newVal }
  }
)
//esta funcion asincrona se encarga de guardar los datos del interprete y tambien de editarlos
async function handleSave() {
  try {
    const body = {
      nombre: interprete.value.nombre.trim(),
      nacionalidad: interprete.value.nacionalidad.trim()
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${interprete.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    interprete.value = {} as Interprete
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<!-- aqui se define la estructura visual del componente -->
<template>
  <!-- este template es el que se encarga de mostrar el dialogo(Dialogo nos referimos a una ventana emergente) -->
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-4">Nombre</label>
        <InputText
          id="nombre"
          v-model="interprete.nombre" 
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nacionalidad" class="font-semibold w-4">Nacionalidad</label>
        <InputText
          id="nacionalidad"
          v-model="interprete.nacionalidad"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
