import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
    return (
        <div className="main-layout">
            {/* Sidebar - Fixed Left */}
            <Sidebar />

            {/* Main Content - Scrollable Right */}
            <main className="content-container bg-white dark:bg-neutral-950 transition-colors duration-300">
                {children}
            </main>
        </div>
    )
}

export default Layout
