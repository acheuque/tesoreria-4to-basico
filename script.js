const API_URL = 'https://script.google.com/macros/s/AKfycbxQ9bxkWrcH58DMwrM3jWX_6Efm9UX7CcFEL0QqigFb4OhI6wfJ67fleQ9wHchcqGeT/exec';

const formatCurrency = (amount) => {
    // Format as Chilean Pesos
    return new Intl.NumberFormat('es-CL', { 
        style: 'currency', 
        currency: 'CLP',
        maximumFractionDigits: 0 // No decimal places for CLP
    }).format(amount);
};

async function loadData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data && data.length > 0) {
            const ingresos = data[0].TotalIngresos;
            const egresos = data[0].TotalEgresos;
            const balance = ingresos - egresos;

            document.getElementById('ingresos').textContent = formatCurrency(ingresos);
            document.getElementById('egresos').textContent = formatCurrency(egresos);
            document.getElementById('balance').textContent = formatCurrency(balance);

            // Add color to balance based on value
            const balanceElement = document.getElementById('balance');
            balanceElement.style.color = balance >= 0 ? '#2e7d32' : '#c62828';
        }
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('ingresos').textContent = 'Error al cargar datos';
        document.getElementById('egresos').textContent = 'Error al cargar datos';
        document.getElementById('balance').textContent = 'Error al cargar datos';
    }
}

loadData(); 