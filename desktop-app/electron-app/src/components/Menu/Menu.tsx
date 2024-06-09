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

import logo from '../../assets/logo2.png';
const Menu = () =>{

    return (
        <header className="header-container d-flex justify-content-between align-items-center ">
            <h2 className="header-title">BONITETNA OCENA</h2>
            <img src={logo} alt="Minilon" className="header-logo" />
        </header>
    );
}
export default Menu;