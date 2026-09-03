<script setup>
import { computed } from 'vue';
import { formatDateOnly, formatTime, formatIDR } from '@/utils';

const props = defineProps({
  income: { type: Object, default: null },
  stand: { type: Object, default: null }
});

// Derived values with safe fallbacks
const items = computed(() => props.income?.order || []);
const subtotal = computed(() => props.income?.transaction || 0);
const discount = computed(() => props.income?.discount || 0);
const tax = computed(() => props.income?.tax || 0);
const total = computed(() => props.income?.total || subtotal.value);
const paymentPrice = computed(() => props.income?.payment_price || subtotal.value); // may differ if structure changes
const change = computed(() => Math.max(paymentPrice.value - total.value, 0));
const method = computed(() => props.income?.method || props.income?.payment_method || 'Cash');

</script>

<template>
  <div class="income-receipt-wrapper">
    <!-- Header Banner -->
    <div class="receipt-header">
      <div class="brand-name">BLATERIAN</div>
    </div>

    <div class="receipt-body">
      <!-- Meta Info -->
      <div class="meta-grid">
        <div class="meta-block">
          <span class="meta-label">Date & Time</span>
          <span class="meta-value">{{ props.income ? (formatDateOnly(props.income.created_at) + ' - ' + formatTime(props.income.created_at)) : '-' }}</span>
        </div>
        <div class="meta-block">
          <span class="meta-label">Place</span>
          <span class="meta-value">{{ props.stand?.place || '-' }}</span>
        </div>
        <div class="meta-block">
          <span class="meta-label">Customer</span>
          <span class="meta-value">{{ props.income?.customer?.name || 'Unregistered' }}</span>
        </div>
        <div class="meta-block">
          <span class="meta-label">Cashier</span>
          <span class="meta-value">{{ props.income?.cashier?.name || props.stand?.pic?.name || '-' }}</span>
        </div>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Order Items -->
      <div class="section-title">Order Items</div>
      <div class="items-list">
        <div v-for="(it, idx) in items" :key="idx" class="item-row">
          <div class="item-main">
            <span class="item-qty">({{ it.qty || 0 }})</span>
            <span class="item-name" :title="it.menu?.name">{{ it.menu?.name || 'Unknown' }}</span>
          </div>
          <div class="item-price">{{ formatIDR((it.menu?.price || 0)) }}</div>
        </div>
        <div v-if="items.length === 0" class="empty-items">No items.</div>
      </div>

      <!-- Totals -->
      <div class="divider"></div>
      <div class="totals">
        <div class="totals-row"><span>Subtotal</span><span>{{ formatIDR(subtotal) }}</span></div>
        <div class="totals-row"><span>Discount</span><span>{{ formatIDR(discount) }}</span></div>
        <div class="totals-row"><span>Tax</span><span>{{ formatIDR(tax) }}</span></div>
        <div class="totals-row total"><span>Total</span><span>{{ formatIDR(total) }}</span></div>
      </div>

      <!-- Payment -->
      <div class="divider"></div>
      <div class="payment">
        <div class="totals-row"><span>Method</span><span>{{ method }}</span></div>
        <div class="totals-row"><span>Price</span><span>{{ formatIDR(paymentPrice) }}</span></div>
        <div class="totals-row"><span>Change</span><span>{{ formatIDR(change) }}</span></div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="tagline">#GoodFoodMakesGoodMood</div>
        <div class="social">blaterian.id</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.income-receipt-wrapper {
  width: 100%;
  background: #ffffff;
  font-size: 0.85rem;
  color: #242424;
  position: relative;
  overflow: hidden;
  border: 1px solid #e4e4e4;
  border-radius: 6px;
}
.income-receipt-wrapper:before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: none;
  background-repeat: repeat;
  background-size: 80px 80px;
  opacity: 0.05;
  pointer-events: none;
}
.receipt-header {
  background: #3d2b53;
  color: #f9b233;
  text-align: center;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 12px 8px 10px;
  font-size: 1.2rem;
  position: relative;
}
.brand-name { position: relative; z-index: 1; }
.receipt-body { position: relative; z-index: 1; padding: 12px 14px 18px; }
.meta-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 8px 12px; }
.meta-label { display:block; font-size:0.65rem; color:#6c6c6c; }
.meta-value { display:block; font-weight:500; color:#222; }
.divider { border-top:1px dashed #c9c9c9; margin:10px 0; }
.section-title { font-weight:600; color:#0d4e85; margin-bottom:6px; }
.items-list { display:flex; flex-direction:column; gap:4px; }
.item-row { display:flex; justify-content:space-between; align-items:center; }
.item-main { display:flex; gap:6px; align-items:center; }
.item-qty { font-weight:500; }
.item-name { font-weight:600; }
.item-price { font-weight:500; color:#111; }
.empty-items { font-style:italic; color:#777; }
.totals { display:flex; flex-direction:column; gap:4px; }
.totals-row { display:flex; justify-content:space-between; }
.totals-row.total span:last-child { font-weight:700; }
.payment { margin-top:4px; display:flex; flex-direction:column; gap:4px; }
.footer { margin-top:14px; text-align:center; font-size:0.7rem; color:#553a76; }
.tagline { font-weight:600; margin-bottom:2px; }
.social { font-weight:500; }
@media (min-width: 576px) {
  .income-receipt-wrapper { max-width: 480px; margin: 0 auto; }
}
</style>
