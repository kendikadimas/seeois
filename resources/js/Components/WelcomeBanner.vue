<script setup>
import { onMounted, ref } from 'vue';

defineProps({
    steps: {
        type: Array,
        default: () => [],
    },
});

const isClosed = ref(false);

onMounted(() => {
    isClosed.value = sessionStorage.getItem('staffDailyReminderClosed') === 'true';
});

function closeBanner() {
    isClosed.value = true;
    sessionStorage.setItem('staffDailyReminderClosed', 'true');
}
</script>

<template>
    <aside v-if="!isClosed && steps.length" class="daily-reminder" aria-label="Pengingat aktivitas staf">
        <div class="daily-reminder__intro">
            <i class="bi bi-check2-square" aria-hidden="true"></i>
            <div>
                <strong>Pengingat hari ini</strong>
                <span>Lengkapi administrasi rutin sebelum selesai bekerja.</span>
            </div>
        </div>

        <div class="daily-reminder__actions">
            <a
                v-for="(step, index) in steps"
                :key="index"
                :href="step.action"
                class="daily-reminder__link"
            >
                <i :class="['bi', step.icon]" aria-hidden="true"></i>
                <span>{{ step.text }}</span>
                <i class="bi bi-arrow-right-short" aria-hidden="true"></i>
            </a>
        </div>

        <button type="button" class="daily-reminder__close" @click="closeBanner" aria-label="Tutup pengingat">
            <i class="bi bi-x-lg" aria-hidden="true"></i>
        </button>
    </aside>
</template>

<style scoped>
.daily-reminder {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0.75rem 1rem 0;
    padding: 0.7rem 0.75rem 0.7rem 0.9rem;
    border: 1px solid #dce3ed;
    border-left: 3px solid #4f46e5;
    border-radius: 0.65rem;
    background: #ffffff;
    color: #1e293b;
}

.daily-reminder__intro {
    display: flex;
    min-width: 14rem;
    align-items: center;
    gap: 0.65rem;
}

.daily-reminder__intro > i {
    color: #4f46e5;
    font-size: 1.1rem;
}

.daily-reminder__intro strong,
.daily-reminder__intro span {
    display: block;
}

.daily-reminder__intro strong {
    font-size: 0.82rem;
}

.daily-reminder__intro span {
    margin-top: 0.08rem;
    color: #64748b;
    font-size: 0.72rem;
}

.daily-reminder__actions {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    gap: 0.45rem;
}

.daily-reminder__link {
    display: inline-flex;
    min-height: 38px;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.65rem;
    border: 1px solid #dce3ed;
    border-radius: 0.5rem;
    color: #334155;
    font-size: 0.76rem;
    font-weight: 650;
    text-decoration: none;
    white-space: nowrap;
}

.daily-reminder__link:hover {
    border-color: #a5b4fc;
    background: #f8f9ff;
    color: #4338ca;
}

.daily-reminder__close {
    display: inline-grid;
    width: 36px;
    height: 36px;
    flex: 0 0 36px;
    place-items: center;
    border: 0;
    border-radius: 0.45rem;
    background: transparent;
    color: #64748b;
}

.daily-reminder__close:hover {
    background: #f1f5f9;
    color: #0f172a;
}

@media (max-width: 767.98px) {
    .daily-reminder {
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 0.55rem;
        margin: 0.55rem 0.65rem 0;
        padding: 0.7rem;
    }

    .daily-reminder__intro {
        min-width: 0;
        flex: 1 1 calc(100% - 2.5rem);
    }

    .daily-reminder__intro span {
        display: none;
    }

    .daily-reminder__actions {
        display: grid;
        order: 3;
        width: 100%;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .daily-reminder__link {
        min-width: 0;
        justify-content: center;
        padding-inline: 0.45rem;
        white-space: normal;
    }

    .daily-reminder__link span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .daily-reminder__close {
        width: 32px;
        height: 32px;
        flex-basis: 32px;
    }
}
</style>
