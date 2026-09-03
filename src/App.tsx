import TasteLanding from './TasteLanding';
import OriginalApp from './OriginalApp';
import BetaPage from './BetaPage';
import NotFoundPage from './NotFoundPage';
import PrivacyPage from './PrivacyPage';
export default function App() {
    const pathname = window.location.pathname.replace(/\/+$/, '');
    const showOriginal = new URLSearchParams(window.location.search).get('design') === 'original';
    if (pathname === '') return showOriginal ? <OriginalApp /> : <TasteLanding />;
    if (pathname === '/beta') return <BetaPage />;
    if (pathname === '/privacy') return <PrivacyPage />;
    if (pathname === '/email-preview') return <OriginalApp />;
    return <NotFoundPage />;
}
