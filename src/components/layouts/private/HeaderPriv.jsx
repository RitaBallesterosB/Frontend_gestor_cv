import NavPriv from "./NavPriv";


export const HeaderPriv = () => {
  return (
    <header>
      <div className="header-priv">
        <a href='#'>
          <img src='src/assets/img/logos/Logo_sinfondo.png' width="180" height="100" />
        </a>
        {/* Aquí integramos el NavPriv en el Header */}
        <NavPriv />
      </div>
    </header>
  );
};