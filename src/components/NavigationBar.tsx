export const NavigationBar = () => {
  return (
    <div style={{ padding: 10, display: "flex", gap: 10 }}>
      <div>
        <span>Apartment</span>
        <select style={{ width: 100 }}>
          <option value="" selected disabled hidden>
            Select Apartment
          </option>
          <option>appt 1</option>
          <option>appt 2</option>
        </select>
      </div>
      <div>
        <span>Date</span>
        <select style={{ width: 100 }}>
          <option value="" selected disabled hidden>
            Choose Date
          </option>
          <option>date 1</option>
          <option>date 2</option>
        </select>
      </div>
    </div>
  );
};
