<script setup lang="ts">
import AlbumList from '@/components/album/AlbumList.vue'
import AlbumSave from '@/components/album/AlbumSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref<boolean>(false)
const albumListRef = ref<typeof AlbumList | null>(null)
const albumEdit = ref<any>(null)

function hableCreate() {
  albumEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(album: any) {
  albumEdit.value = album
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  albumListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <h1>Albumes</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="hableCreate" />
    <AlbumList ref="albumListRef" @edit="handleEdit" />
    <AlbumSave
      :mostrar="mostrarDialog"
      :album="albumEdit"
      :modoEdicion="!!albumEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
