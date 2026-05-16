<template>
    <div class="rich-text-editor shadow-sm rounded">
        <div ref="editorRef" style="min-height: 250px;"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: 'Tulis sesuatu yang luar biasa...',
    },
});

const emit = defineEmits(['update:modelValue']);

const editorRef = ref(null);
let quill = null;

onMounted(() => {
    // Load Quill from CDN if not already loaded
    if (!window.Quill) {
        const link = document.createElement('link');
        link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://cdn.quilljs.com/1.3.6/quill.min.js';
        script.onload = initQuill;
        document.head.appendChild(script);
    } else {
        initQuill();
    }
});

function initQuill() {
    if (!editorRef.value) return;

    quill = new window.Quill(editorRef.value, {
        theme: 'snow',
        placeholder: props.placeholder,
        modules: {
            toolbar: {
                container: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['link', 'image', 'clean']
                ],
                handlers: {
                    image: imageHandler
                }
            }
        }
    });

    // Set initial content
    quill.root.innerHTML = props.modelValue;

    // Listen for changes
    quill.on('text-change', () => {
        const html = quill.root.innerHTML;
        emit('update:modelValue', html === '<p><br></p>' ? '' : html);
    });
}

function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
        const file = input.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                // Use axios for upload
                const response = await window.axios.post('/marketing/upload-image', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', response.data.url);
            } catch (error) {
                console.error('Image upload failed:', error);
                alert('Gagal mengunggah gambar. Pastikan format benar dan ukuran tidak terlalu besar.');
            }
        }
    };
}

// Sync from outside if needed (e.g. when resetting form)
watch(() => props.modelValue, (newVal) => {
    if (quill && newVal !== quill.root.innerHTML) {
        quill.root.innerHTML = newVal || '';
    }
});

onBeforeUnmount(() => {
    // Cleanup if needed
});
</script>

<style>
.ql-container {
    font-family: 'Poppins', sans-serif !important;
    font-size: 15px !important;
}
.ql-toolbar {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: #f8fafc;
    border-color: #e2e8f0 !important;
}
.ql-container {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-color: #e2e8f0 !important;
}
</style>
