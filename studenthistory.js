// Initialize Firebase (if not yet initialized)
const firebaseConfig = {
  apiKey: "AIzaSyCmY01W7nrK_SnKCGM4sblWna03KbLDEwU",
  authDomain: "uniserve-d990a.firebaseapp.com",
  projectId: "uniserve-d990a",
  storageBucket: "uniserve-d990a.appspot.com",
  messagingSenderId: "417274438534",
  appId: "1:417274438534:web:c7ff020cd9d8d19fd302"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const historyContainer = document.getElementById('history-list');
historyContainer.textContent = "Loading...";

// Fetch data from Firestore
db.collection('checkouts').orderBy("checkoutDate", "desc").get()
  .then(snapshot => {
    if (snapshot.empty) {
      historyContainer.innerHTML = "<p>No purchase history found.</p>";
      return;
    }

    let html = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      html += `
        <div class="history-item">
          <h3>🧾 Receipt: ${data.receiptId}</h3>
          <p><strong>Name:</strong> ${data.studentName}</p>
          <p><strong>ID:</strong> ${data.studentId}</p>
          <p><strong>Status:</strong> ${data.status}</p>
          <p><strong>Payment:</strong> ${data.paymentMethod}</p>
          <p><strong>Checkout:</strong> ${new Date(data.checkoutDate).toLocaleDateString()}</p>
          <p><strong>Pickup:</strong> ${new Date(data.pickupDate).toLocaleDateString()}</p>
          <p><strong>Total:</strong> ₱${data.total}</p>
          <ul>
            ${data.items.map(item => `
              <li>${item.name} (${item.size}) x${item.quantity} - ₱${item.price * item.quantity}</li>
            `).join('')}
          </ul>
          <p><strong>Note:</strong> ${data.notes}</p>
          <hr/>
        </div>
      `;
    });

    historyContainer.innerHTML = html;
  })
  .catch(error => {
    console.error("❌ Error loading history:", error);
    historyContainer.innerHTML = "<p>Error loading history.</p>";
  });
