<script setup>
import StaffLayout from '@/Layouts/StaffLayout.vue';
import BusinessBalance from '@/Components/BusinessBalance.vue';
import Notif from '@/Components/Notif.vue';
import { Head } from '@inertiajs/vue3';

defineProps({ balance: Object, total_income: Number, total_expense: Number, income: Array, expense: Array, default_tab: [Number, String], filter: Object, notif: Object });
</script>

<template>
    <Head title="Saldo Goods" />
    <StaffLayout>
        <template #header>Saldo Goods</template>
        <Notif v-if="notif" :notif="notif" />
        <BusinessBalance title="Saldo Merchandise" subtitle="Pantau arus kas penjualan produk dan setoran ke kas utama."
            :balance="balance" :total-income="total_income" :total-expense="total_expense" :income="income" :expense="expense"
            :default-tab="default_tab" :filter="filter" :income-filter-route="route('good.balance.filter.cash_in')"
            :expense-filter-route="route('good.balance.filter.cash_out')" :withdraw-route="route('good.balance.withdraw')" />
    </StaffLayout>
</template>
