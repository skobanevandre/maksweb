<template>
  <div class="margin-top">
      <div class="imageSheet">
        <div
          v-for="( img, i ) in images"
          :key = "i"      
          class="imageContainer" >
      
          <img
            :src = "'/images/item/' + article + '/' + img" 
            class = "itemImg" >

          <vs-button icon shadow size="small" class="delImage" @click="delImage(img)">
            <i class='bx bx-x'></i>
          </vs-button>
        
          <vs-button icon :shadow = "!isMainImage(img)" size="small" class="mainImage" @click="setMainImage(img)">
            <i class='bx bx-star'></i>
          </vs-button>

          <vs-button icon shadow size="small" class="altImage" @click="altImage( img )">
            Описание
          </vs-button>
          
        </div>
      </div>

      <div class="fileButtonBlock">
        <input type="file" ref="imageSelect" @change="handleImage" accept="image/*" class="hidden"/>
        <vs-button @click="selectClick" >Добавить изображение</vs-button>
      </div>  
    </div>
</template>