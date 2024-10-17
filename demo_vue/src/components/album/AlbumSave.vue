<!-- el Save.vue es un componente que permite crear o editar un registro -->
<script setup lang="ts">
import type { Album } from '@/models/album'
import type { Interprete } from '@/models/interprete'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import { computed, onMounted, ref, watch } from 'vue'

//aqui se define el endpoint de la API(ENDPOINT quiere decir punto final)
const ENDPOINT = 'albumes'
const props = defineProps({
  mostrar: Boolean,
  album: {
    type: Object as () => Album,
    default: () => ({}) as Album
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
//aqui se define el album que es un objeto que se encarga de almacenar los datos del album

const interpretes = ref<Interprete[]>([])
const interprete = ref<Interprete>({} as Interprete)

const album = ref<Album>({ ...props.album })
watch(
  () => props.album,
  (newVal) => {
    album.value = { ...newVal }
  }
)

async function obtenerInterpretes() {
  interpretes.value = await http.get('interpretes').then((response) => response.data)
}
//esta funcion asincrona se encarga de guardar los datos del album y tambien de editarlos
async function handleSave() {
  try {
    const body = {
      idInterprete: album.value.interprete.id,
      nombre: album.value.nombre.trim(),
      fechaLanzamiento: album.value.fechaLanzamiento
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${album.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    album.value = {} as Album
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

onMounted(() => {
  obtenerInterpretes()
})
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
        <label for="interprete" class="font-semibold w-4">Interprete</label>
        <Select
          id="interprete"
          v-model="album.interprete"
          :options="interpretes"
          optionLabel="nombre"
          class="flex-auto"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-4">Nombre del Album</label>
        <InputText
          id="nombre"
          v-model="album.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nacionalidad" class="font-semibold w-4">fecha Lanzamiento</label>
        <DatePicker
          id="fechaLanzamiento"
          v-model="album.fechaLanzamiento"
          class="flex-auto"
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
