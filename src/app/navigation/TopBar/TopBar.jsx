import "./TopBar.css";

export default function TopBar() {
  return (
    <header className="TopBar">
      <div className="TopBarBrand">
        <img src="https://i.ibb.co/FkY63bLK/Demeter-Fresh-Sleek.png" alt="" />

        <div>
          <h2>Demeter</h2>
          <span>Nutrition Tracker</span>
        </div>
      </div>
    </header>
  );
}