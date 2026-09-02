import TasteLanding from './TasteLanding';
import OriginalApp from './OriginalApp';
export default function App() {
    const pathname = window.location.pathname.replace(/\/+$/, '');
    const showOriginal = new URLSearchParams(window.location.search).get('design') === 'original';
    return pathname === '' && !showOriginal ? <TasteLanding /> : <OriginalApp />;
}
