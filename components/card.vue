<template>
  <div>
    <vs-card class="card">

      <template #title>
        <h3>{{title}}</h3>
      </template>

      <template #img>
        <img :src=image :alt=title>
      </template>

    <template #text>
      <div class="amountblock">
        <center><span class="cost">{{cost}} ₽</span></center>      
        <vs-button danger flat>
          В корзину
        </vs-button>
      </div>
    </template>

    <template #interactions>
      <vs-button danger size="small">
        <i class='bx bx-heart'></i>
      </vs-button>
    </template>

    </vs-card>
  </div>
</template>

<script>
export default {
  props: [ 'title', 'image', 'cost', ],
  data() {
    return {
      amount: 0,
    }
  }
}
</script>


<style scoped>
  .card {
    margin: 10px;
  }

  .amountblock {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
  }

  .cost {
    color: red;
    font-weight: bold;
    font-size: 1.5em;
  }

</style>
