import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGenres } from '../api/endpoints';
import { useFetch } from '../hooks/useFetch';
import { useLibrary } from '../hooks/useLibrary';
import { StatsRow } from '../components/library/StatsRow';
import { LibraryTabs } from '../components/library/LibraryTabs';
import { MovieGrid } from '../components/movie/MovieGrid';
import './LibraryPage.css';

const EMPTY_MESSAGES = {
  watched: "You haven't marked any movies as watched yet.",
  watchlist: 'Your watchlist is empty — add movies you want to see.',
  favorites: "You haven't favorited any movies yet.",
};

export function LibraryPage({ activeTab, onTabChange }) {
  const { state, counts, stats } = useLibrary();
  const navigate = useNavigate();
  const { data: genresData } = useFetch(() => getGenres(), []);

  const topGenreName = useMemo(() => {
    const genre = (genresData?.genres || []).find((item) => item.id === stats.topGenreId);
    return genre?.name;
  }, [genresData, stats.topGenreId]);

  const movies = useMemo(() => {
    const ids = Object.keys(state[activeTab] || {});
    return ids
      .map((id) => state.movieMeta[id])
      .filter(Boolean)
      .map((meta) => ({
        id: meta.id,
        title: meta.title,
        poster_path: meta.posterPath,
        release_date: meta.year ? `${meta.year}-01-01` : '',
        vote_average: meta.voteAverage,
        genre_ids: meta.genreIds,
      }));
  }, [state, activeTab]);

  const handleTabSelect = (tab) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      navigate(`/${tab}`);
    }
  };

  return (
    <main className="container library-page">
      <h1 className="page-heading">My CineVault Library</h1>
      <p className="library-page__subtitle">
        Personal cinema archive synced with local <code>data/mis_datos.json</code>
      </p>

      <StatsRow counts={counts} stats={stats} genreName={topGenreName} />

      <LibraryTabs activeTab={activeTab} counts={counts} onSelect={handleTabSelect} />

      <MovieGrid movies={movies} emptyMessage={EMPTY_MESSAGES[activeTab]} />
    </main>
  );
}
