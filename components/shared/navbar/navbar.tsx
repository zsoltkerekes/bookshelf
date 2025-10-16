
import { ColorModeButton } from '@/components/ui/color-mode'
import styles from './navbar.module.css'

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ColorModeButton />
        </nav>
    )
}