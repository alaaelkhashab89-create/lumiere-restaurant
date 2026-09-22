const SUPABASE_URL = "https://ktflfwwjpfqrdibwtaql.supabase.co";
const SUPABASE_KEY = "sb_publishable_viDShjwa3XTcNWCJfqm5yA_wZLnFAFZ";
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});


const reservationForm = document.querySelector("#reservationForm");

reservationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = reservationForm.querySelector('input[type="text"]').value;
    const email = reservationForm.querySelector('input[type="email"]').value;
    const phone = reservationForm.querySelector('input[type="tel"]').value;
    const date = document.querySelector("#reservationDate").value;
    const time = reservationForm.querySelector('input[type="time"]').value;
    const guests = parseInt(reservationForm.querySelector('select').value);
    const { error } = await supabaseClient
        .from("reservations")
        .insert([
            {
                name: name,
                email: email,
                phone: phone,
                reservation_date: date,
                reservation_time: time,
                guests: guests
            }
        ]);

    if (error) {
        alert("Something went wrong. Please try again.");
        console.error(error);
        return;
    }

    alert("Your table has been reserved successfully! ✨");

    reservationForm.reset();
});


const reservationDate = document.querySelector("#reservationDate");

const today = new Date().toISOString().split("T")[0];

reservationDate.min = today;