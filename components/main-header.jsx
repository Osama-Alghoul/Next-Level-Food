import Link from "next/link";
import logoImage from '@/assets/logo.png';
import Image from "next/image";
import styles from './main-header.module.css';
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";
export default function MainHeader() {
    return (
        <>
        <MainHeaderBackground />
        <header className={styles.header}>
            <Link href='/' className={styles.logo}>
                <Image src={logoImage} alt="Logo" priority />
                NextLevel Food
            </Link>

            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink href={'/meals'}>Brows Meals</NavLink>
                    </li>
                    <li>
                        <NavLink href={'/community'}>Foodies Community</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
        </>
        
    );
}