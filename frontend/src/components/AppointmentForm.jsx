

const AppointmentForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="phone">Mobile Number</label>
        <input type="tel" id="phone" name="phone" required />
      </div>
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
