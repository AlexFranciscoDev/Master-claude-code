import { Route, Routes } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToastHost } from './components/common/Toast';
import { DiscoverPage } from './pages/DiscoverPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { ActorDetailPage } from './pages/ActorDetailPage';
import { LibraryPage } from './pages/LibraryPage';

function LibraryRoute({ tab }) {
  return <LibraryPage activeTab={tab} />;
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<DiscoverPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/actor/:id" element={<ActorDetailPage />} />
        <Route path="/watchlist" element={<LibraryRoute tab="watchlist" />} />
        <Route path="/watched" element={<LibraryRoute tab="watched" />} />
        <Route path="/favorites" element={<LibraryRoute tab="favorites" />} />
      </Routes>
      <Footer />
      <ToastHost />
    </>
  );
}
