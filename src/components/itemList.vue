<template>
  <div class="item-list">
    <div v-for="(item, index) in items" :key="index" class="item">
      <div class="item-details">
        <p class="item-name">{{ item.name }}</p>
        <p class="item-price">$ {{ item.price }}</p>
      </div>
      <div class="button-group">
        <button @click="addToCart(item)" class="add-to-cart-btn">Add to Cart</button>
        <button @click="updateItem(index)" class="update-btn">Update</button>
        <button @click="removeItem(index)" class="remove-btn">Remove</button>
      </div>
    </div>
    <button @click="addItem" class="add-item-btn">Add New Item</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { name: 'Pink Shirt', price: 11 },
        { name: 'Green Shirt', price: 10 },
        { name: 'Yellow Shirt', price: 9 },
        { name: 'White Shirt', price: 8 },
        { name: 'Gray Shirt', price: 13 },
        { name: 'Purple Shirt', price: 15 }
      ]
    };
  },
  methods: {
    addToCart(item) {
      this.$emit('add-to-cart', item);
    },
    updateItem(index) {
      const item = this.items[index];
      const newName = prompt('Enter the new name:', item.name);
      const newPrice = parseFloat(prompt('Enter the new price:', item.price));
      
      if (newName && !isNaN(newPrice)) {
        item.name = newName;
        item.price = newPrice;
      }
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    addItem() {
      const name = prompt('Enter the name for the new item:');
      const price = parseFloat(prompt('Enter the price for the new item:'));
      
      if (name && !isNaN(price)) {
        this.items.push({ name, price });
      }
    }
  }
};
</script>

<style scoped>
.item-list {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.item-details {
  flex: 1;
}

.item-name {
  margin: 0;
  font-weight: bold;
}

.item-price {
  margin: 0;
}

.button-group {
  display: flex;
  gap: 10px;
}

.add-to-cart-btn, .update-btn, .remove-btn, .add-item-btn {
  background-color: #5296ba;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover, .update-btn:hover, .remove-btn:hover, .add-item-btn:hover {
  background-color: #457087;
}

.add-item-btn {
  margin-top: 20px;
}

</style>
