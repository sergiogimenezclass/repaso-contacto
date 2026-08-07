/**
 * Agenda de Contactos - Frontend Logic (JavaScript Vanilla)
 * Didactic HTTP & DOM Manipulation Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // API Endpoint Base
    const API_URL = '/api/contactos';

    // State
    let contactsList = [];

    // DOM Elements
    const contactForm = document.getElementById('contact-form');
    const searchInput = document.getElementById('search-input');
    const contactsTableBody = document.getElementById('contacts-table-body');
    const emptyState = document.getElementById('empty-state');
    
    // Modal DOM Elements
    const modalBackdrop = document.getElementById('modal-backdrop');
    const editContactForm = document.getElementById('edit-contact-form');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');

    // Toast Container
    const toastContainer = document.getElementById('toast-container');

    // ==========================================================================
    // 1. Toast Notification Component (No alert/prompt)
    // ==========================================================================
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = 'ℹ️';
        if (type === 'success') icon = '✅';
        if (type === 'error') icon = '❌';

        toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;
        toastContainer.appendChild(toast);

        // Auto remove toast after 3.5 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(30px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // Helper: Escape HTML string for security (XSS prevention)
    function escapeHTML(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // ==========================================================================
    // 2. Fetch API Operations (CRUD Integration)
    // ==========================================================================

    // A. GET: Cargar contactos desde la REST API
    async function loadContacts() {
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
            }

            contactsList = await response.json();
            renderContacts(contactsList);
        } catch (error) {
            console.error('Error al cargar contactos:', error);
            showToast('Error al conectar con el servidor para cargar contactos.', 'error');
        }
    }

    // B. POST: Crear un nuevo contacto
    async function createContact(contactData) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Error al guardar contacto');
            }

            showToast(`Contacto "${result.nombre}" agregado con éxito.`, 'success');
            contactForm.reset();
            loadContacts();
        } catch (error) {
            console.error('Error al crear contacto:', error);
            showToast(error.message, 'error');
        }
    }

    // C. PUT: Actualizar contacto existente
    async function updateContact(id, contactData) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Error al actualizar contacto');
            }

            showToast(`Contacto "${result.nombre}" actualizado correctamente.`, 'success');
            closeModal();
            loadContacts();
        } catch (error) {
            console.error('Error al actualizar contacto:', error);
            showToast(error.message, 'error');
        }
    }

    // D. DELETE: Eliminar contacto por ID
    async function deleteContact(id, nombre) {
        // En lugar de confirm/alert, pedimos confirmacion usando toast o borrado directo con notificacion
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Error al eliminar contacto');
            }

            showToast(`Contacto "${nombre}" eliminado.`, 'info');
            loadContacts();
        } catch (error) {
            console.error('Error al eliminar contacto:', error);
            showToast(error.message, 'error');
        }
    }

    // ==========================================================================
    // 3. Renderizado y Manipulación del DOM
    // ==========================================================================

    function renderContacts(contacts) {
        contactsTableBody.innerHTML = '';

        if (!contacts || contacts.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');

        contacts.forEach(contact => {
            const tr = document.createElement('tr');
            
            // Determinar clase de badge segun la categoria
            const catLower = (contact.categoria || 'personal').toLowerCase();

            tr.innerHTML = `
                <td><strong>${escapeHTML(contact.nombre)}</strong></td>
                <td>${escapeHTML(contact.telefono)}</td>
                <td>${contact.email ? escapeHTML(contact.email) : '<span class="text-muted">-</span>'}</td>
                <td><span class="badge badge-${catLower}">${escapeHTML(contact.categoria)}</span></td>
                <td class="actions-cell">
                    <button type="button" class="btn-icon btn-edit" data-id="${contact.id}" title="Editar contacto" aria-label="Editar contacto">✏️</button>
                    <button type="button" class="btn-icon btn-delete" data-id="${contact.id}" data-nombre="${escapeHTML(contact.nombre)}" title="Eliminar contacto" aria-label="Eliminar contacto">🗑️</button>
                </td>
            `;

            contactsTableBody.appendChild(tr);
        });
    }

    // Filtro de búsqueda en tiempo real
    function filterContacts(query) {
        const q = query.toLowerCase().trim();
        const filtered = contactsList.filter(c => 
            c.nombre.toLowerCase().includes(q) ||
            c.telefono.toLowerCase().includes(q) ||
            (c.email && c.email.toLowerCase().includes(q))
        );
        renderContacts(filtered);
    }

    // ==========================================================================
    // 4. Manejo del Modal
    // ==========================================================================

    function openModal(contact) {
        document.getElementById('edit-id').value = contact.id;
        document.getElementById('edit-nombre').value = contact.nombre;
        document.getElementById('edit-telefono').value = contact.telefono;
        document.getElementById('edit-email').value = contact.email || '';
        document.getElementById('edit-categoria').value = contact.categoria || 'Personal';

        modalBackdrop.classList.remove('hidden');
        modalBackdrop.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
        modalBackdrop.classList.add('hidden');
        modalBackdrop.setAttribute('aria-hidden', 'true');
        editContactForm.reset();
    }

    // ==========================================================================
    // 5. Event Listeners
    // ==========================================================================

    // Formulario de creacion
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const categoria = document.getElementById('categoria').value;

        if (!nombre || !telefono) {
            showToast('Por favor, completa los campos obligatorios (*).', 'error');
            return;
        }

        createContact({ nombre, telefono, email, categoria });
    });

    // Formulario de edicion en Modal
    editContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('edit-id').value;
        const nombre = document.getElementById('edit-nombre').value.trim();
        const telefono = document.getElementById('edit-telefono').value.trim();
        const email = document.getElementById('edit-email').value.trim();
        const categoria = document.getElementById('edit-categoria').value;

        if (!nombre || !telefono) {
            showToast('El nombre y el teléfono son obligatorios.', 'error');
            return;
        }

        updateContact(id, { nombre, telefono, email, categoria });
    });

    // Event Delegation para botones de Editar / Eliminar en la tabla
    contactsTableBody.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.btn-edit');
        const deleteBtn = e.target.closest('.btn-delete');

        if (editBtn) {
            const id = parseInt(editBtn.dataset.id, 10);
            const contact = contactsList.find(c => c.id === id);
            if (contact) {
                openModal(contact);
            }
        }

        if (deleteBtn) {
            const id = parseInt(deleteBtn.dataset.id, 10);
            const nombre = deleteBtn.dataset.nombre;
            deleteContact(id, nombre);
        }
    });

    // Filtro de busqueda
    searchInput.addEventListener('input', (e) => {
        filterContacts(e.target.value);
    });

    // Cerrar modal
    modalCloseBtn.addEventListener('click', closeModal);
    modalCancelBtn.addEventListener('click', closeModal);

    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
            closeModal();
        }
    });

    // Carga inicial
    loadContacts();
});
