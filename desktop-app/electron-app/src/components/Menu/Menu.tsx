/**
 * @file Menu.tsx
 * @brief Komponenta za prikaz glavnega menija
 *
 * @opis Komponenta Menu prikazuje glavni meni aplikacije, vključno z naslovom "BONITETNA OCENA" in logotipom.
 *
 * @potrebuje react
 *
 * @verzija 1.0.0
 * @since 1.0.0
 */
const Menu = () =>{

    return (
        <header className="header-container d-flex justify-content-between align-items-center ">
            <h1 className="header-title">BONITETNA OCENA</h1>
            <img src="/logo/logo2.PNG" alt="Logo" className="header-logo" />
        </header>
    );
}
export default Menu;