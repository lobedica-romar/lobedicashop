<template>
    <div class="cart">
      <!-- Cart items -->
      <div v-for="(item, index) in cart" :key="index" class="cart-item">
        <div class="item-details">
          <h3 class="item-name">{{ item.name }}</h3>
          <p class="item-price">$ {{ item.price }}</p>
          <p class="item-quantity">Quantity: {{ item.quantity }}</p>
      </div>
      <div class="quantity-controls">
        <button @click="openDialog(index)" class="action-btn">Update</button>
        <button @click="removeFromCart(index)" class="action-btn">Remove</button>
      </div>
    </div>
  
      <!-- Total -->
      <p class="total">Total: $ {{ total }}</p>
  
      <!-- Dialog for updating quantity -->
      <div v-if="dialogVisible" class="dialog">
      <div class="dialog-content">
        <p>Enter new quantity for {{ cart[selectedItemIndex].name }}:</p>
        <input type="number" v-model="newQuantity" @keydown.enter="updateQuantity(selectedItemIndex)" class="quantity-input">
        <div class="dialog-buttons">
          <button @click="updateQuantity(selectedItemIndex)" class="action-btn">Save</button>
          <button @click="closeDialog" class="action-btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        dialogVisible: false,
        selectedItemIndex: null,
        newQuantity: '', // Use newQuantity to bind the input value
      };
    },
    props: {
      cart: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      total() {
        if (this.cart.length === 0) {
          return 0; // Return 0 if the cart is empty
        }
        return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },
    },
    methods: {
      openDialog(index) {
        this.selectedItemIndex = index;
        // Initialize newQuantity to the quantity of the selected item
        this.newQuantity = this.cart[index].quantity.toString(); // Set as string to handle empty input
        this.dialogVisible = true;
      },
      closeDialog() {
        this.dialogVisible = false;
      },
      updateQuantity(index) {
        // Parse the input value as an integer directly within the input handler
        const newQuantity = parseInt(this.newQuantity);
  
        // Check if the parsed value is a valid integer and non-negative
        if (!isNaN(newQuantity) && newQuantity >= 0) {
          // Emit an event to notify the parent component about the quantity update
          this.$emit('update-quantity', { index, quantity: newQuantity });
          // Close the dialog
          this.closeDialog();
        } else {
          // Show an alert if the input is not valid
          alert('Please enter a valid non-negative integer!');
        }
      },
      removeFromCart(index) {
        this.$emit('remove-from-cart', index);
      },
    },
  };
  </script>
  
  <style scoped>
  .cart {
    margin-top: 20px;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #f8f8f8;
    border-radius: 8px;
    margin-bottom: 15px;
  }
  
  .item-details {
    flex: 1;
  }
  
  .item-name {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .item-quantity {
    margin: 0;
  }
  
  .item-price {
    margin: 0;
  }
  
  .quantity-controls {
    display: flex;
    gap: 10px;
  }
  
  button {
    margin-left: 10px;
  }

  .quantity-input {
    width: 80px;
  }
  
  .total {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 20px;
  }
  
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dialog-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
  }
  
  .dialog-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }

  .action-btn {
    background-color: #5296ba;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .action-btn:hover {
    background-color: #457087;
  }

  .dialog-content input {
    width: 100px;
  }
  </style>
