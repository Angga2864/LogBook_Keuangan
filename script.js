document.addEventListener("DOMContentLoaded", function () {
  // Menampilkan waktu realtime
  function updateTime() {
    const currentTimeElement = document.getElementById("currentTime");
    const now = new Date();
    currentTimeElement.innerHTML = now.toLocaleString("id-ID", { dateStyle: "full", timeStyle: "medium" });
  }
  setInterval(updateTime, 1000);
  updateTime();

  const expenseForm = document.getElementById("expenseForm");
  const expenseTableBody = document.getElementById("expenseTableBody");
  const totalExpenseElement = document.getElementById("totalExpense");

  let expenses = [];

  // Mengelola data pengeluaran
  expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const expenseType = document.getElementById("expenseType").value;
    const expenseAmount = parseFloat(document.getElementById("expenseAmount").value);
    const expenseNote = document.getElementById("expenseNote").value;
    const timestamp = new Date().toLocaleString("id-ID");

    const expense = { timestamp, expenseType, expenseAmount, expenseNote };
    expenses.push(expense);
    updateTable();
    updateTotalExpense();

    expenseForm.reset();
  });

  // Update tabel pengeluaran
  function updateTable() {
    expenseTableBody.innerHTML = "";
    expenses.forEach((expense) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${expense.timestamp}</td>
                <td>${expense.expenseType}</td>
                <td>Rp ${expense.expenseAmount.toLocaleString("id-ID")}</td>
                <td>${expense.expenseNote}</td>
            `;
      expenseTableBody.appendChild(row);
    });
  }

  // Menghitung total pengeluaran
  function updateTotalExpense() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const totalExpense = expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.timestamp);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
      })
      .reduce((total, expense) => total + expense.expenseAmount, 0);
    totalExpenseElement.innerHTML = `Rp ${totalExpense.toLocaleString("id-ID")}`;
  }
});
